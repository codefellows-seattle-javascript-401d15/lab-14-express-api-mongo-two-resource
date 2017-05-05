![cf](https://i.imgur.com/7v5ASc8.png) lab 14 double resource express/mongo api
======

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Build Tool Instructions
* create a package.json that lists all dependencies and developer dependencies
 * have a start and test npm script
* include an .eslintrc
* include a .gitignore
 * **add the string `db` to a new line in your gitignore file so that you don't include the db directory monogd is storing its files in!**
* include any necessary NPM scripts
  * have a lint script for running eslint
  * have a test script for running mocha
  * have a default script for running the lint and mocha tasks
* a readme with a project description and api docs

# Directions
* Create a second **Model** using `mongoose.Schema` and `mongoose.model`
 * The model can represent whatever data you choose. _e.g. note, blog post, store items_
 * It must have a relationship of many to one with the resource from from lab-13
 * one of its properties must be of type `mongoose.Schema.ObjectId` and reference an ObjectId for a resource from lab-13
* add an array of type `mongoose.Schema.ObjectId` with a `ref` to your new-model on your model from lab-13
* use data in your routes that return your model from lab-13
* use the `body-parser` express middleware on `POST` and `PUT` routes
* using the express `Router` create a route for doing **RESTFUL CRUD** operations on your second **Model**
 * thoughtfully name your routes, and be consistent

## Server Endpoints
* make three routes that operate on your second model

## Tests
* test each new route for `200`, `204`, `400`, and `404` whenever applicable.
