#About
Small Node.js App for Codefellows Coding Bootcamp.

Keep track of your favorite Steven Universe Characters and their affiliations using MONGOdb!


##Installation:

1. clone this repository and ``cd`` into it
2. run ``npm i``

## To Use:
1. Start the server using ``npm start`` in one terminal
2. In another, you'll need to spin up the mongo database server
  ⋅⋅⋅ * Ensure there is a directory named 'db' in your cloned repository
  ⋅⋅⋅ * In your terminal, enter ``mongod --dbpath ./db``
  ⋅⋅⋅ ⋅⋅⋅ Should you come into the 'address in use' error, ``sudo killall mongod`` should do it.
3. 2. In yet another terminal, use [HTTPie][https://httpie.org/] to perform the following CRUD operations:

###routes:
*Note that an affiliation must exist before a Gem, as the affiliation property of the gem is required*
* POST Affiliation: ``http POST localhost:3000/api/aff  name='Earth' leader='Rose Quartz'``
  ⋅⋅⋅ When making a POST request, you should get the created affiliation object as a response where you will find an id has been created for it
  ⋅⋅⋅ Note that the properties "name" and "Leader" are required to successfully Post an Affiliation.
  POST Gem: ``http POST localhost:3000/api/aff  name='String' color='String' weapon: 'String' isFusion=Boolean affiliation='string'``
*The following routes work for both Gems and affiliations, simply replace aff with gem*
* GET: ``http GET localhost:3000/api/aff/id ``
  ⋅⋅⋅ Again you will get the entire body of the object you've requested
  ⋅⋅⋅ If there are gems under the requested affiliation, their ID's will be listed in an array on the object body.
  ⋅⋅⋅ making the same GET request without an ID will return an array of all currently existing Affiliations.
* PUT: ``http PUT localhost:3000/api/aff/id leader='Steven Universe'``
* DELETE: ``http DELETE localhost:3000/api/aff/id``
