# lab 14
----
## Goal
Create a multiple(two) resource, ReSTful, API, now with Mongo-odness!

## Setup

 - **make sure you have Node.js and MongoDB installed.**
```$ apt-get node```
```$ npm install mongoose```

 - **install the app**
```$ npm istall ```

 - **start the server**
```$ npm run start```

 - **start the database**
```$ mongo```
```$ use lureEnv```


## Usage
You can do basic *CRUD* operations using the following end points *respectively*:

- POST:
    - http POST :3000/api/lure/[id]&name=<nameVal>&type=<typeVal>&targets=<targetsVal>&water=<waterVal>
        - Name, type, and targets are required values.  An _id value will be created by MongoBD and the water value defaults to 'fresh'.
- GET
    - http GET :3000/api/lure/[id] (returns a specific record)
        - id is required
    - http GET :3000/api/lure/ (returns all available records)
- PUT
    - http POST :3000/api/lure/[id]&name=<nameVal>&type=<typeVal>&targets=<targetsVal>&water=<waterVal>
        - Name, type, and targets are optional values.  Any key value pair passed will alter an existing key/value pair in the item.
        - invalid key will return an error
- DELETE
    - http GET :3000/api/lure/[id] (deletes a specific record)
        - id is required


## Expected

- EXAMPLE JSON:
```json
    {
    "_id": ObjectId("590e23b91e3e3917147d283f"),
    "name": "test",
    "type": "rattler",
    "targets": "trout",
    "water": "fresh",
    "__v": 0  
    }
```

### Attributions
Big thanks to the TAs. I was setup for success in this lab by getting help from them.
Abby White offered to help me with put route by looking at her repo: https://github.com/abswhite/lab-09-single-resource-api-fs/blob/master/lab-abigail/lib/storage.js
