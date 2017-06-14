![cf](https://i.imgur.com/7v5ASc8.png) lab 14 double resource express/mongo api

# Overview
  * Created a HTTP Server using `express`
  * Create a two Models:
    * Shelter model represents animal shelter with properties 'name' and 'neighborhood' and an objectId that links to the second model for Cats. It has a one to many relationship.
    * Cat model represents cat with properties 'name' and 'mood' and a shelterId.
  * Data is stored in MongoDB
  * Used the `body-parser` express middleware on `POST` and `PUT` routes
  * Used the express `Router` to creates routes for RESTFUL CRUD operations on cat model

# Installation
  * Clone this repo and navigate to the lab-shelly directory
  * Download the dependencies
  * Run nodemon server in terminal
  * Use server endpoints for requests

## Server Endpoints
### `/api/shelter/:shelterId/cat`
  * `POST` request
    * Create a cat by specifying the name and mood. You will need to include the shelter ID in your query string
    ```
    HTTP POST :3000/api/shelter/<shelterID>/cat name="milo" mood="hungry"
    ```
### `/api/cat/:id`
  * `GET` request
    * Get a cat by passing an id in the query string
    ```
    HTTP GET :3000/api/cat/12345
    ```
  * `DELETE` request
    * Delete a cat by passing in an id in the query string. It should return 204 status with no content in the body
    ```
    HTTP DELETE :3000/api/cat/12345
    ```
  * `PUT` request
    * Update a cat by passing in a valid id in the query string and specifying the new name and mood.
    ```
    HTTP PUT :3000/api/cat/12345 name="eva" mood="grumpy"
    ```
### `/api/cat`
* `GET` request
  * Returns all cats
  ```
  HTTP GET :3000/api/cat
  ```
### `/api/shelter`
  * `POST` request
    * Create a shelter by specifying the name and neighborhood.
    ```
    HTTP POST :3000/api/shelter name="cap hill animal clinic" neighborhood="cap hill"
    ```
### `/api/shelter/:id`
  * `GET` request
    * Get a shelter by passing an id in the query string
    ```
    HTTP GET :3000/api/shelter/<shelterID>
    ```
  * `DELETE` request
    * Delete a shelter by passing in an id in the query string. It should return 204 status with no content in the body
    ```
    HTTP DELETE :3000/api/shelter/<shelterID>
    ```
  * `PUT` request
    * Update a shelter by passing in a valid id in the query string and specifying the new name and neighborhood.
    ```
    HTTP PUT :3000/api/shelter/<shelterID> name="cap hill SPCA" neighborhood="north cap hill"
    ```
### `/api/shelter`
* `GET` request
  * Returns all shelters
  ```
  HTTP GET :3000/api/shelter
  ```
