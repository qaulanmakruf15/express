# POS BACKEND
POS BACKEND is a Restful API application to authentication, autorizhation, upload image, hash password, catching data and CRUD.

## Build with
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Redis](https://redis.io/)

## Requirements
* [Node.js](https://nodejs.org/en/)
* [Redis](https://redis.io/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](Postgres, Mysql, etc)

## Project setup

```
npm install
```

### Install nodemon

Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

If you have already installed, skip this step.

```
npm install -g nodemon
```

### Setup .env example

Create .env file in your root project folder.

```
DB_HOST = '*'
DB_USER = '*'
DB_PASSWORD = '*' 
DB_DATABASE = '*'
```

### Run project for development

```
npm start

# express-app
