# sms-management

## Technologies Used
* NodeJS
* Express
* MongoDB
* Mongoose
* Babel


## Installation
1.  Git clone this repository `https://github.com/Ruqoyah/sms-management.git`
2.  Change your directory `cd sms-management`
3.  Install all dependencies `npm install`
4.  Create .env file which will be used to load environment variables see sample in `.env.example` file in the project
7.  Start the app `npm start` for development 
8.  Navigate to `localhost:2000` on postman to test the endpoints


## Endpoints
* [POST] /api/contacts - To create a new contact
* [DELETE] /api/contacts/:contactId - To delete contact
* [POST] /api/:contactId/sms - To send SMS
* [GET] /api/:contactId/sms/sent - To get user sent sms
* [GET] /api/:contactId/sms/received - To et user received sms
