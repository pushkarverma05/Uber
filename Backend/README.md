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
