# Delilah Restó

_Acá va un párrafo que describa lo que es el proyecto_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋
_Instalar node.js, mysql workbench _


### Instalación 🔧

_Debes instalar dependencias en la consola (ubicarse en la raíz del proyecto)_

**Express**

```
$ npm i express
```

**JSON Web Token (JWT)**
_para crear un token que sirva para enviar datos entre aplicaciones o servicios y garantizar que sean válidos y seguros._

```
$ npm i jsonwebtoken
```

**Base de datos**

```
$ npm i mysql2
```
## Dominio del server 🖥

_localhost:4444_

## Ejecutando las pruebas ⚙️
_en el siguiente instructivo encontraras el codigo para ejecutar pruebas de uso de la api, lo puedes probar en [postman](https://www.postman.com/) o [insomnia](https://insomnia.rest/).

## USUARIOS 🙍‍♂️

### Agregar usuario 🙍‍♂️

_El role del user puede ser **ADMIN** | **USER**_

_[POST] localhost:4444/user/add_

```
{
        "USER_NAME": "",
        "FULL_NAME": "",
        "EMAIL": "",
        "PHONE_COUNTRY_CODE": "",
        "PHONE_NUMBER": "",
        "ADDRESS": "",
        "PASSWORD": "",
        "ROLE": "" 
    }
```

### Ejemplo de RESPUESTA /user/add 👌

```
{
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 15,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    }
```
### Login (usuario) 🙍‍♂️

_[POST] localhost:4444/user/login_

```
{
        "USER_NAME": "asdsa",
        "EMAIL": "dsadsa",
        "PASSWORD": "dsads"
    }
```
### Ejemplo de RESPUESTA /user/login 👌

_Este token lo usaras mas adelante para las pruebas asi que tenlo presente_

```
{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTUsIlVTRVJfTkFNRSI6ImFzZHNhIiwiRU1BSUwiOiJkc2Fkc2EiLCJST0xFIjoiQURNSU4iLCJpYXQiOjE2MDA5OTMwNzB9.PomyN_NdYIdbdFuWhGtetopD8TGiyeoUV18GF08uDTg"
    }
```
## PRODUCTOS 🍔##

### Obtener listado de productos 🍔

_[GET] localhost:4444/productos_

## Ejemplo de RESPUESTA /productos 👌

```
[
        {
            "ID": 1,
            "PRODUCT_NAME": "TEST2",
            "PRODUCT_PRICE": 1,
            "PRODUCT_IMAGE": "https://www.ipcc.ch/site/assets/uploads/sites/3/2019/10/img-placeholder.png"
        }
    ]
```

### Agregar nuevo producto 🍔

_[POST] localhost:4444/productos/add_

```
{
        "PRODUCT_NAME": "name", 
        "PRODUCT_PRICE": "11", 
        "PRODUCT_IMAGE": "https://.jpg",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTUsIlVTRVJfTkFNRSI6ImFzZHNhIiwiRU1BSUwiOiJkc2Fkc2EiLCJST0xFIjoiQURNSU4iLCJpYXQiOjE2MDA5OTMwNzB9.PomyN_NdYIdbdFuWhGtetopD8TGiyeoUV18GF08uDTg"
    }
```

## Ejemplo de RESPUESTA /productos/add 👌

```
{
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 7,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    }
```
### Remover producto ❌🍔

_[POST] localhost:4444/productos/remove_

```
{
        "PRODUCT_NAME" : <condicion>, 
        "PRODUCT_PRICE" : <condicion>, 
        "PRODUCT_IMAGE" : <condicion>,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTUsIlVTRVJfTkFNRSI6ImFzZHNhIiwiRU1BSUwiOiJkc2Fkc2EiLCJST0xFIjoiQURNSU4iLCJpYXQiOjE2MDA5OTMwNzB9.PomyN_NdYIdbdFuWhGtetopD8TGiyeoUV18GF08uDTg"
    }
```

## Ejemplo de RESPUESTA /productos/remove 👌

```{
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "",
        "serverStatus": 34,
        "warningStatus": 0
    }
```

### Actualizar datos de un producto 🖊️🍔

_[POST] localhost:4444/productos/update_

```{
        "PRODUCT_NAME" : <valor_a_actualizar>, 
        "PRODUCT_PRICE" : <valor_a_actualizar>, 
        "PRODUCT_IMAGE" : <valor_a_actualizar>
        "WHERE" : {
            "ID" : <condicion>,
            "PRODUCT_NAME" : <condicion>, 
            "PRODUCT_PRICE" : <condicion>, 
            "PRODUCT_IMAGE" : <condicion>
        }
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTUsIlVTRVJfTkFNRSI6ImFzZHNhIiwiRU1BSUwiOiJkc2Fkc2EiLCJST0xFIjoiQURNSU4iLCJpYXQiOjE2MDA5OTMwNzB9.PomyN_NdYIdbdFuWhGtetopD8TGiyeoUV18GF08uDTg"
    }
```

## Ejemplo de RESPUESTA /productos/remove 👌

```{
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "info": "",
        "serverStatus": 34,
        "warningStatus": 0
    }
```

## PEDIDOS 🍔##

### Obtener un pedido 🔔
_Los admins pueden veer todos los pedidos. Los users no admins solo tienen permisos para retornar sus proprios pedidos_

_[GET] localhost:4444/order?token<>_

## Ejemplo de RESPUESTA /order?token<> 👌

```[
        {
            "ID": 1,
            "ESTADO": "CONFIRMADO",
            "HORA": "21:56",
            "DESCRIPCION": null,
            "PAGO": 1.4,
            "USUARIO": 11,
            "DIRECCION": null
        }
    ]
```

### Crear un pedido 🔔

_[POST] localhost:4444/order/create_

```{
        "PAGO": "11",
        "DIRECCION": "Direccion",
        "PRODUCTOS": {
            <id_del_producto> : {
                "QNT": <cantidad_de_unidades>
            },
            <id_del_producto> : {
                "QNT": <cantidad_de_unidades>
            }
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTUsIlVTRVJfTkFNRSI6ImFzZHNhIiwiRU1BSUwiOiJkc2Fkc2EiLCJST0xFIjoiQURNSU4iLCJpYXQiOjE2MDA5OTMwNzB9.PomyN_NdYIdbdFuWhGtetopD8TGiyeoUV18GF08uDTg"
    }
```

## Ejemplo de RESPUESTA /order/create 👌

```{
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 2,
  "info": "",
  "serverStatus": 2,
  "warningStatus": 0
}
```

### Editar un pedido 🖊️🔔
_Los pedidos apenas aceptan los estados ('NUEVO', 'CONFIRMADO', 'PREPARANDO', 'ENVIANDO', 'CANCELADO', 'ENTREGADO')_

_[POST] localhost:4444/order/edit_

```{	
	    "ESTADO" : "CONFIRMADO",
        "DESCRIPCION" : "DESCRIPCION",
        "DIRECCION" : "DIRECCION", 
        "WHERE": {
		    "ID" : "1"
	    },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTQsIlVTRVJfTkFNRSI6IlVTRVJURVNUVFQiLCJFTUFJTCI6IlVTRVJURVNUQFVTRVJURVNULlVTRVJVU0VSVEVTVFRUVEVTVCIsIlJPTEUiOiJBRE1JTiIsImlhdCI6MTYwMDgxOTMxOH0.lS481Xro9oZ24mK2KtpEorNpydcBAqK1WXi7uCdmCRc"
    }
```
## Ejemplo de RESPUESTA /order/edit 👌

```{
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 0,
  "info": "Rows matched: 1  Changed: 1  Warnings: 0",
  "serverStatus": 2,
  "warningStatus": 0,
  "changedRows": 1
}
```

### Borrar un pedido ❌🔔

_[POST] localhost:4444/order/delete_

```{
        ID: <numero>,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTQsIlVTRVJfTkFNRSI6IlVTRVJURVNUVFQiLCJFTUFJTCI6IlVTRVJURVNUQFVTRVJURVNULlVTRVJVU0VSVEVTVFRUVEVTVCIsIlJPTEUiOiJBRE1JTiIsImlhdCI6MTYwMDgxOTMxOH0.lS481Xro9oZ24mK2KtpEorNpydcBAqK1WXi7uCdmCRc"
    }
```
## Ejemplo de RESPUESTA /order/delete 👌

```{
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 0,
  "info": "",
  "serverStatus": 2,
  "warningStatus": 0
}```


Por favor lee el [README.md](https://github.com/laynaPatino/API-Delilah/blob/main/README.md) para detalles deL código.


## Autor ✒️

* **Andrés Villanueva** [laynaPatino](https://github.com/laynaPatino)


---
⌨️ con ❤️ por [laynaPatino](https://github.com/laynaPatino) 😊
