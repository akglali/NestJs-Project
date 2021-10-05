
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```



## Main Idea Of Repository
- A basic login,signup,create post ,get single post, get all post back-end with nestJs.

##Database
For the database, I used postgreSql with the table shown below
#Tables

###users Table (name type)
- user_id uuid, username text,password text,token text
###post_table (name type)
- post_id uuid, user_id uuid,text_field text, comment_count int, posted_date timestamp, likes int ,dislikes int
###post_user_nickname_table (name type)
- post_id uuid, user_id uuid, nickname text,color text
- 
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

