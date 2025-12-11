# CountryDataRetriever

CountryDataRetriever is a Node.js Express server that provides a comprehensive REST API for accessing global country information. Built with authentication and database support, it allows users to sign up, log in, and retrieve detailed data about countries including their capitals, currencies, languages, regions, flags, and more. The server uses SQLite for data persistence and JWT tokens for secure API access. It can be deployed locally or via Docker, and includes full OpenAPI specification documentation for easy integration.

- Student name: Tharin Deelaka Mahale
- IIT number: 20200709
- UoW ID: W1833548
- OpenAPI Specification: [./openapi-spec.json](./openapi-spec.json)
- GitHub: https://github.com/tharinDmahale/CountryDataRetriever

## How to run

### Using npm
1. At the root level of the project give the command ```npm install```.
2. Then, give the command ```npm run server```.
3. Use postman to perform requests.

### Using docker
1. At the root level of the project give the command ```docker build -t server .```.
2. Then, give the command ```docker run -p 3000:3000 server```.
3. Use postman to perform requests.

## Endpoints

### About
URL: http://localhost:3000/ <br>
Method: ```GET```

### Sign up
URL: http://localhost:3000/SignUp <br>
Method: ```POST``` <br>
Body:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```

### Sign in
URL: http://localhost:3000/SignIn <br>
Method: ```POST``` <br>
Body:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```
Note: In this request it is important to use the ```response.data.token.tokencontent``` from the response to perform further requests beyond this point.

### Get country
URL: http://localhost:3000/Country/{CountryName} <br>
Method: ```GET``` <br>
Headers: ```authorization: Bearer tokencontent``` <br>
Note: Requires authorization tokencontent from [Sign in](#sign-in) response.

### Get currency
URL: http://localhost:3000/Currency/{CurrencyCode} <br>
Method: ```GET``` <br>
Headers: ```authorization: Bearer tokencontent``` <br>
Note: Requires authorization tokencontent from [Sign in](#sign-in) response.

### Get capital
URL: http://localhost:3000/Capital/{CapitalName} <br>
Method: ```GET``` <br>
Headers: ```authorization: Bearer tokencontent``` <br>
Note: Requires authorization tokencontent from [Sign in](#sign-in) response.

### Get language
URL: http://localhost:3000/Language/{LanguageName} <br>
Method: ```GET``` <br>
Headers: ```authorization: Bearer tokencontent``` <br>
Note: Requires authorization tokencontent from [Sign in](#sign-in) response.

### Get flag
URL: http://localhost:3000/Flag/{CountryName} <br>
Method: ```GET``` <br>
Headers: ```authorization: Bearer tokencontent``` <br>
Note: Requires authorization tokencontent from [Sign in](#sign-in) response.

### Get region
URL: http://localhost:3000/Region/{RegionName} <br>
Method: ```GET``` <br>
Headers: ```authorization: Bearer tokencontent``` <br>
Note: Requires authorization tokencontent from [Sign in](#sign-in) response.

### Sign out
URL: http://localhost:3000/SignOut <br>
Method: ```DELETE``` <br>
Headers: ```authorization: Bearer tokencontent``` <br>
Body:
```json
{
    "username": "<username>"
}
```
Note: Requires authorization tokencontent from [Sign in](#sign-in) response.
