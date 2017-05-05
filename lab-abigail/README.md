![cf](https://i.imgur.com/7v5ASc8.png) Lab 14 REST Principles with Mongo and Mongoose
======

# About
This program allows users to store and modify information regarding the name, type, and cost of a food item using a Mongo Database. The program utilizes REST principles to POST, GET, DELETE, and update entries, given custom user input. This program runs in the user's terminal on `localhost:3000`. Please enjoy!

# Directions for Modifying Database
1. First, `npm i` to download all resources onto the local machine.
2. In terminal, run files using `nodemon server`.
3. In a separate terminal tab, enter entries:

  * To run POST, type into command line:
`http POST :3000/api/food name='<food name>' type='<item type>' cost='<amount>'`
    * Example: `http POST :3000/api/food name='apple' type='red' cost='5'`

  * To run GET, type into command line: `http GET :3000/api/food/<id-number>`
    * Example: `http GET :3000/api/food/24b62d24-39ff-4049-a2bc-a05711e7b449`

  * To run PUT, type into command line: `http PUT :3000/api/food/<id-number> name=<updated food name> type=<updates item type> cost=<updates amount>`
    * Example: `http PUT :3000/api/food/24b62d24-39ff-4049-a2bc-a05711e7b449' cost='6'`
  * Use one, two, or all of update categories

  * To run DELETE, type into command line: `http DELETE :3000/api/food/<id-number>`
4. Run tests by running `npm run test`

* Improper requests will render a 'Bad Request' 400 status, or 404 status.

# Directions for Accessing Database
1. Open Mongo Shell by entering `mongod --dbpath ./db` in the local machine terminal.
  * Verify shell by receiving localhost assignment in terminal window.
2. In a separate terminal tab, access Mongo environment by entering `mongo`.
2. After creating a db entry (see steps above), you can view the database by entering `show dbs`.
3. After verifying database creation in Step 2, you can enter the database environment by entering `use <database name>`.
