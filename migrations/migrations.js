module.exports = [
    `CREATE DATABASE IF NOT exists delilah;`,
    `USE delilah;`,
    `CREATE TABLE IF NOT exists users (
        ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        USER_NAME varchar(30) NOT NULL,
        FULL_NAME varchar(60) NOT NULL,
        EMAIL varchar(100) NOT NULL,
        PHONE_COUNTRY_CODE INT NOT NULL,
        PHONE_NUMBER INT NOT NULL,
        ADDRES varchar(200),
        PASSWORD varchar(100) NOT NULL
    );`,
    `alter table users add column ADDRESS varchar(250) not null`,
    `alter table users drop column ADDRES;`,
    `alter table users add column ROLE varchar(50) not null;`,
    `CREATE TABLE IF NOT exists products (
        ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        PRODUCT_NAME varchar(100) NOT NULL,
        PRODUCT_PRICE float NOT NULL,
        PRODUCT_IMAGE varchar(150)
    );`,
    `CREATE TABLE IF NOT EXISTS pedidos (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        ESTADO ENUM('NUEVO', 'CONFIRMADO', 'PREPARANDO', 'ENVIANDO', 'CANCELADO', 'ENTREGADO'),
        HORA VARCHAR(30),
        DESCRIPCION TEXT,
        PAGO FLOAT,
        USUARIO INT,
        DIRECCION VARCHAR(100)
    );`
];