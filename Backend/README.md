# User Registration API

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their details. Upon successful registration, a JSON Web Token (JWT) is generated for the user.

## Request Body
The request body must be in JSON format and include the following fields:

- `fullname`:(objet):
  - `firstname`: A string representing the user's first name (minimum 3 characters, required).
  - `lastname`: A string representing the user's last name (optional).
- `email`: A string representing the user's email address (must be a valid email format, required).
- `password`: A string representing the user's password (minimum 6 characters, required).

### Example Request
- `user`: (objet):
- `fullname`:(objet).
  - `firstname`: A string representing the user's first name (minimum 3 characters, required).
  - `lastname`: A string representing the user's last name (optional).
- `email`: A string representing the user's email address (must be a valid email format, required).
- `password`: A string representing the user's password (minimum 6 characters, required).
-`token`:(String):JWT Token

## User Login API

### Endpoint
`POST /users/login`

### Description
This endpoint allows an existing user to log in by providing their email address and password. On successful authentication, a JSON Web Token (JWT) is returned.

### Request Body
The request body must be in JSON format and include the following fields:
- `email`: A string representing the user's email address (must be a valid email format, required).
- `password`: A string representing the user's password (minimum 6 characters, required).

### Example Request
{
  "email": "user@example.com",
  "password": "yourpassword"
}

### Example Response
{
  "token": "JWT Token",
  "user": { /* user details object */ }
}

## '/users/profile' Endpoint
### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

'GET'    YOU,4 seconds ago • Uncommitted changes

### Authentication

Requires a valid JWT token in the Authorization header:
'Authorization: Bearer <token>'


## '/users/logout'
Endpoint
### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

'GET'

### Authentication

Requires a valid JWT token in the Authorization