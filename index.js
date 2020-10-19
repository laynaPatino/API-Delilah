const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use( express.json() );

const jsonWebToken = require('jsonwebtoken');
const { json } = require('express');
const myJWTSecretKey = 'a61twg283e328das'; 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'delilah'
});

const tokenVerify = (req, res, next) => {
    let token;

    if (req.route.methods.get) {
        token = req.query.token;
    } else {
        token = req.body.token;
    }

    try {
        const tokenDecodedData = jsonWebToken.verify(token, myJWTSecretKey);    
        const {
            ID,
            ROLE
        } = tokenDecodedData;

        req.USER_DATA = {
            ID,
            ROLE,
        };

        next();

    } catch {
        res.json({error:'token invalido'})
    }
    

};

const isAdminUser = (req, res, next) => {

    if (req.USER_DATA.ROLE === "ADMIN") {
        next();
    } else {
        res.json({error : 'El usuario no es admin'});
    }

};

app.get('/productos', (req, res) => {
    //uso my servidor mysql y hago una query
    //En la funcion query el primero parametro es la query y el segundo es una funcion que tiene 3 parametros
    //El parametro 1 = a un posible error; El parametro 2 == a un objeto que contiene el resultado de la consulta; El paramatro 3 nos devuelve el nombre de las columnas de la tabla;
    connection.query(
        'SELECT * FROM `products`;',
        function(err, results, fields) {
            res.json(results);
        }
    );
});
app.post('/productos/:operacion/', tokenVerify, isAdminUser, (req, res) => {
    
    //Aca estamos creando constantes de los valores del json que recibimos en el body del pedido. 
    const {
        PRODUCT_NAME,
        PRODUCT_PRICE,
        PRODUCT_IMAGE, 
        WHERE,
    } = req.body;   

    //en el objeto req.param tengo un json que me devuelve todas las variables de parametros que puedo llegar a usar en mi url.
    switch(req.params.operacion) {
        //Estamos verificando dentro del switch que valor de operacion tengo en la variable operacion y tratando la informacion segun su valor.
        case 'add':
            
            connection.query(
                "INSERT INTO products (PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_IMAGE) VALUES ('"+PRODUCT_NAME+"', '"+PRODUCT_PRICE+"', '"+PRODUCT_IMAGE+"');",
                function(err, results, fields) {
                    res.json(results);
                }
            );
         
        break;

        case 'remove':
                        
            let stringCondition = "";
            const conditionsName = ["PRODUCT_NAME", "PRODUCT_PRICE", "PRODUCT_IMAGE"];
            const conditionsValue = [PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_IMAGE];

            conditionsValue.forEach( (condition, index) => {
                //Verificar si la condicion no devuelve undefined
                if (condition !== undefined) {
                    
                    if (stringCondition === "") {
                        stringCondition = "WHERE " + conditionsName[index] + " = '" + conditionsValue[index]  + "'";
                    } else {
                        stringCondition = stringCondition + " AND " + conditionsName[index] + " = '" + conditionsValue[index] + "'";
                    }

                };
            });
            
            connection.query(
                "DELETE FROM products " + stringCondition,
                function(err, results, fields) {
                    res.json(results);
                }
            );
        break;

        case 'update':
        
            if (WHERE === undefined) {
                res.json( { error: "El update deberia tener una condicion" } )
            }

            let updateStringCondition = "";
            const updateConditionsName = [
                                            "PRODUCT_NAME", 
                                            "PRODUCT_PRICE", 
                                            "PRODUCT_IMAGE",
                                            "ID"
                                        ];
 
            const updateConditionsValue = [
                                            WHERE.PRODUCT_NAME || undefined, 
                                            WHERE.PRODUCT_PRICE || undefined, 
                                            WHERE.PRODUCT_IMAGE || undefined,
                                            WHERE.ID || undefined,
                                        ];

            updateConditionsValue.forEach( (condition, index) => {

                if (condition !== undefined) {
                    if (updateStringCondition === "") {
                        updateStringCondition = " WHERE " + updateConditionsName[index] + " = '" + updateConditionsValue[index]  + "'";
                    } else {
                        updateStringCondition = updateStringCondition + " AND " + updateConditionsName[index] + " = '" + updateConditionsValue[index] + "'";
                    }  
                }
            });

            let changeString = "";
            const changeRequestName = ["PRODUCT_NAME", "PRODUCT_PRICE", "PRODUCT_IMAGE"];
            const changeRequestValue = [PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_IMAGE];

            changeRequestValue.forEach( (condition, index) => {

                if (condition !== undefined) {
                    if (changeString === "") {
                        changeString = "SET " + changeRequestName[index] + " = '" + changeRequestValue[index]  + "'";
                    } else {
                        changeString = changeString + " , " + changeRequestName[index] + " = '" + changeRequestValue[index] + "'";
                    }  
                }
            });

            connection.query(
                "UPDATE products " + changeString + updateStringCondition,
                function(err, results, fields) {
                    res.json(results);
                }
            );
                        
        break;

        //en el default enviamos en json con un mensaje de error caso ninguna condicion del switch de cumpla.
        default:
            res.json({error: 'Endpoint invalido'});
    };
});
app.post('/user/add', (req, res) => {
    
    const {
        USER_NAME,
        FULL_NAME,
        EMAIL,
        PHONE_COUNTRY_CODE,
        PHONE_NUMBER,
        ADDRESS,
        PASSWORD,
        ROLE,
    } = req.body;

    const verifyInputs = (
        USER_NAME != undefined &&
        FULL_NAME != undefined &&
        EMAIL != undefined &&
        PHONE_COUNTRY_CODE != undefined &&
        PHONE_NUMBER != undefined &&
        PASSWORD != undefined &&
        ROLE != undefined
    );

    if (!verifyInputs) {
        res.json({error : 'Hay datos de usuario faltantes!'});
        return;
    }

    /*
    *
        INSERT INTO #table1 (Id, guidd, TimeAdded, ExtraData)
        SELECT Id, guidd, TimeAdded, ExtraData
        FROM #table2
        WHERE NOT EXISTS (Select Id, guidd From #table1 WHERE #table1.id = #table2.id)
    *
    */
   
    connection.query(
        "INSERT INTO `users` (USER_NAME, FULL_NAME, EMAIL, PHONE_COUNTRY_CODE, PHONE_NUMBER, ADDRESS, PASSWORD, ROLE) VALUES ('"+USER_NAME+"', '"+FULL_NAME+"', '"+EMAIL+"', '"+PHONE_COUNTRY_CODE+"', '"+PHONE_NUMBER+"', '"+ADDRESS+"', '"+PASSWORD+"' , '"+ROLE+"');",
        function(err, results, fields) {
            res.json(results);
        }
    );
});
app.post('/user/login', (req, res) => {

    const {
        USER_NAME,
        EMAIL,
        PASSWORD,
    } = req.body;

    let stringCondition = "";
    const conditionsName = ["USER_NAME", "EMAIL", "PASSWORD"];
    const conditionsValue = [USER_NAME, EMAIL, PASSWORD];

    conditionsValue.forEach( (condition, index) => {
        //Verificar si la condicion no devuelve undefined
        if (condition !== undefined) {
            if (stringCondition === "") {
                stringCondition = "WHERE " + conditionsName[index] + " = '" + conditionsValue[index]  + "'";
            } else {
                stringCondition = stringCondition + " AND " + conditionsName[index] + " = '" + conditionsValue[index] + "'";
            }
        }
    });

    if ( USER_NAME && PASSWORD || EMAIL && PASSWORD ) {

        const queryString = "SELECT * FROM users " + stringCondition;

        connection.query(
            queryString,
            function(err, results, fields) {
                

                const {
                    ID,
                    USER_NAME,
                    EMAIL,
                    ROLE,
                } = results[0];

                const payload = {
                    ID,
                    USER_NAME,
                    EMAIL,
                    ROLE,
                }

                const token = jsonWebToken.sign(payload, myJWTSecretKey);
                
                res.json({token});
            }
        );

    } else {
        res.status(401);
        res.json({
            error: 'Username O Password inexistente'
        });
    }

});
app.post('/order/create', tokenVerify, (req, res) => {

    //Aca estamos creando constantes de los valores del json que recibimos en el body del pedido. 
    const {
        PAGO,
        DIRECCION,
        PRODUCTOS
    } = req.body;   


    const ESTADO = "NUEVO";

    //Obtener Hora actual
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const HOUR = hour + ":" + minutes;

    const productID = Object.keys(PRODUCTOS)
    let stringCondition, productsData;
    let descriptionString = "";

    productID.forEach( (condition, index) => {
        //Verificar si la condicion no devuelve undefined
        if (index === 0) {
            stringCondition = " WHERE ID =" + condition;
        } else {
            stringCondition = stringCondition + " OR ID =" + condition;
        };
    });

    connection.query("SELECT * FROM products" + stringCondition, (err, results, fields) => {
        productsData = results;
        
        let productList =  {};

       

        productsData.forEach( productListItems => {
            productList[productListItems.ID] = productListItems.PRODUCT_NAME;
        })
       
        const databaseProducts = Object.keys(productList);

        let productVerify = false;
        
        databaseProducts.forEach( (databaseProductsUnit) => {
            if (productID.includes(databaseProductsUnit)) {
                productVerify = true;
            };
        });

        if(!productVerify) {
            res.json({ error: "Producto invalido!"  });
        };

        productID.forEach( id => {
            descriptionString +=  PRODUCTOS[id].QNT + "x " + productList[id] + " ";
        })

        connection.query(
            "INSERT INTO pedidos (ESTADO, HORA, DESCRIPCION, PAGO, USUARIO, DIRECCION) VALUES ('"+ESTADO+"', '"+HOUR+"', '"+descriptionString+"', '"+PAGO+"', '"+req.USER_DATA.ID+"', '"+DIRECCION+"');",
            function(err, results, fields) {
                if(err) {
                    console.log(err)
                }
                res.json(results);
            }
        );
    });
});
app.get('/order', tokenVerify, (req, res) => {

    const {
        ID,
        ROLE,
    } = req.USER_DATA;

    let QUERY = 'SELECT * FROM `pedidos`';
    if (ROLE !== "ADMIN") {
        QUERY = QUERY + " WHERE USUARIO = '" + ID + "'";
    }

    connection.query(
        QUERY,
        function(err, results, fields) {
            res.json(results);
        }
    );
})
app.post('/order/edit', tokenVerify, isAdminUser, (req, res) => {

    const {
        ESTADO,
        DESCRIPCION,
        DIRECCION, 
        WHERE,
    } = req.body;  

    if (WHERE === undefined) {
        res.json( { error: "El update deberia tener una condicion" } )
    }

    let updateStringCondition = "";
    const updateConditionsName = [
                                    "ESTADO", 
                                    "DESCRIPCION", 
                                    "DIRECCION",
                                    "ID"
                                ];

    const updateConditionsValue = [
                                    WHERE.ESTADO || undefined, 
                                    WHERE.DESCRIPCION || undefined, 
                                    WHERE.DIRECCION || undefined,
                                    WHERE.ID || undefined,
                                ];

    updateConditionsValue.forEach( (condition, index) => {

        if (condition !== undefined) {
            if (updateStringCondition === "") {
                updateStringCondition = " WHERE " + updateConditionsName[index] + " = '" + updateConditionsValue[index]  + "'";
            } else {
                updateStringCondition = updateStringCondition + " AND " + updateConditionsName[index] + " = '" + updateConditionsValue[index] + "'";
            }  
        }
    });

    let changeString = "";
    const changeRequestName = ["ESTADO", "DESCRIPCION", "DIRECCION"];
    const changeRequestValue = [ESTADO, DESCRIPCION, DIRECCION];

    changeRequestValue.forEach( (condition, index) => {

        if (condition !== undefined) {
            if (changeString === "") {
                changeString = "SET " + changeRequestName[index] + " = '" + changeRequestValue[index]  + "'";
            } else {
                changeString = changeString + " , " + changeRequestName[index] + " = '" + changeRequestValue[index] + "'";
            }  
        }
    });

    connection.query(
        "UPDATE pedidos " + changeString + updateStringCondition,
        function(err, results, fields) {
            if(err) {
                console.log(err);
            }
            res.json(results);
        }
    );
});
app.post('/order/delete', tokenVerify, isAdminUser, (req, res) => {
    const {
        ID
    } = req.body;
    
    let QUERY = 'DELETE FROM `pedidos` WHERE ID = ' + ID + ';';
    connection.query(
       QUERY,
        function(err, results, fields) {
            if(err) {
                console.log(err);
            }
            res.json(results);
        }
    );
});

app.listen(4444, () => console.log('Server Running...'));