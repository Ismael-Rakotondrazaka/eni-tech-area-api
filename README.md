# template-api

# Folder structure
```
.
├── src/
│   ├── configs/
│   │   ├── errorConfig 
│   │   ├── userConfig
│   │   └── index.js //configs of the app, not depending on the environement
│   ├── controllers/
│   │   ├── users/
│   │   │   ├── indexUser.js
│   │   │   ├── updateUser.js
│   │   │   ├── destroyUser.js
│   │   │   └── index.js //controllers
│   │   ├── qrcodes/
│   │   │   ├── createQrCode.js
│   │   │   ├── decodeQrCode.js
│   │   │   └── index.js
│   │   └── index.js //expose all controllers
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMidddleware.js // middlewares
│   │   └── index.js
│   ├── migrations/
│   │   ├── 20221126211644-create-user.js
│   │   └── index.js // migration files
│   ├── models/
│   │   ├── Note.js
│   │   ├── User.js
│   │   └── index.js // models used by the app (entities impl)
│   ├── policies/
│   │   ├── notePolicy.js
│   │   ├── userPolicy.js
│   │   └── index.js //defines which action can be done by wich user
│   ├── resources/
│   │   ├── noteResource.js
│   │   └── userResource.js
|   |   └──index.js // format the model to a safer object (like raw model, user model without password...)
│   ├── routes/
│   │   └── api/
│   │       └── v1/
│   │           ├── users/
│   │           │   └── index.js //routes, will be used by the express app
│   │           └── qrcodes/
│   │               └── index.js
│   ├── services/
│   │   ├── multer/
│   │   │   ├── uploadFile.js
│   │   │   └── index.js
│   │   ├── firebase/
│   │   │   ├── storage.js
│   │   │   └── index.js
│   │   └── index.js //third party (external) services
│   ├── utils/
│   │   ├── errors/
│   │   │   └── inde.js
│   │   ├── strings/
│   │   │   ├── validateEmail.js
│   │   │   ├── validateName.js
│   │   │   └── index.js
│   │   └── index.js // utils folder contains helper functions used by controllers and middlewares
│   ├── app.js // the express app
│   └── server.js //the entry point, the server that use the express app
└── .env.example //example of .env variables
```

# Response
There are only **two** (2) types of responses with this API: **data** and **error**

## Data
Use ```createResponseData``` from ```/src/utils``` to create a data response.
```js
const data = {
    user: {
        id: 1,
        ...
    },
    ...
};

const dataResponse = createResponseData({
    data: data,
    request: req, // the express request
});

res.json(dataResponse); // send the response to the client
```
```js
// data received by the client
{
    data: {
        user: {
            id: 1,
            ...
        },
        ...
    },
    path: "/api/v1/sms?test=456",
    method: "POST",
    userAgent: "PostmanRuntime/7.29.0"
}
```

## Error
```createResponseError``` from ```/src/utils/responses``` creates an error response.\
**You don't need to call it**. Instead, throw any **Error** from ```/src/utils/errors``` depending in your use-case. The error will be handled automatically by the ```errorMiddleware``` from ```/src/middlewares```.

```js
{
    error: {
        message: "The resource is not found.",
        statusCode: 400,
        statusText: "Not Found",
        code: "E3",
        dateTime: "2023-01-21T16:47:21.886Z",
    },
    path: "/api/v1/email?test=456",
    method: "POST",
    userAgent: "PostmanRuntime/7.29.0"
}
```

## Throwing Error
```js
if (!email) throw new BadRequestError({ // you can use other Errors, like NotFoundError, UnauthorizedError
    message: "The email is not valid.", // message
    code: "E2_2", // error code, see below
    isPrivate: false, // default: false. If true, the default message of the error type will be send to the client.
})
```

## Error codes
Unique code of the Error\
(add them as the development grow)\
!! They are **NOT** arranged by topic or subject.
| code   | Description                                  |
| ------ | -------------------------------------------- |
| **E0** | UnknownError                                 |
| **E1** | ServerError                                  |
| E1_1   | Not implemented yet                          |
| E1_2   | Trying to update virtual property of a model |
| **E2** | BadRequestError                              |
| E2_1   | firstName is missing                         |
| E2_2   | lastName is missing                          |
| E2_3   | email is missing                             |
| E2_4   | password is missing                          |
| E2_5   | passwordValidation is missing                |
| E2_6   | password is not a string                     |
| E2_7   | password is empty string                     |
| E2_8   | email is not a string                        |
| E2_9   | email is an empty string                     |
| E2_10  | email is invalid                             |
| E2_11  | gender is missing                            |
| E2_12  | gender is not a string                       |
| E2_13  | gender is an empty string                    |
| E2_14  | gender is invalid                            |
| E2_15  | firstName not a string                       |
| E2_16  | firstName is an empty string                 |
| E2_17  | lastName is not a string                     |
| E2_18  | lastName is an empty string                  |
| E2_19  | passwordValidation is different of password  |
| **E3** | NotFoundError                                |
| E3_1   | Resource not found                           |
| E3_2   | Page or route not found                      |
| **E4** | ConflictError                                |
| E4_1   | Email already used                           |
| **E5** | UnauthorizedError                            |
| E5_1   | Auth failed                                  |
| **E6** | ForbiddenError                               |
