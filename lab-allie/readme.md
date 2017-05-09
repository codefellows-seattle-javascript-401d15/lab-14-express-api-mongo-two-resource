## Single-Resource API

The purpose of this project is to create a custom API using REST methods: POST, GET, PUT, and DELETE. Rather than implementing promises (as in lab 8), this lab uses Bluebird to promisify file system (fs) read and write methods.


#### Command Line Interface
The lab uses the following commands in the terminal command line for these methods.

To POST a new musical album:

`http POST :3000/api/album artist=billy+joel title=piano+man year=1984`

To GET an existing musical album:

`http GET :3000/api/album/ac977e02-7b36-4bb6-a200-64335716d8a5`

To PUT (update) an existing musical album:

`http PUT :3000/api/album artist=billy+joel title=piano+man year=1986`

To DELETE an existing musical album:

`http DELETE :3000/api/album/ac977e02-7b36-4bb6-a200-64335716d8a5`

To POST a new track to an existing album:
`http POST :3000/api/album/590ca5f4435ceff8dea2c47b/track  trackName=uptown+girl`
where `590ca5f4435ceff8dea2c47b` is equal to the album id and `uptown+girl` is equal to the name of the track to be added

To GET a new track that has been added to an existing album:
`http GET :3000/api/album/590ca5f4435ceff8dea2c47b/track/590ca9dbb48fdcfa60d6792b`
where `590ca5f4435ceff8dea2c47b` is the id of the album and `590ca9dbb48fdcfa60d6792b` is the id of the track

To PUT (update) an existing track: 
`http PUT :3000/api/track/590ca9dbb48fdcfa60d6792b trackName=easy+money`
where `590ca9dbb48fdcfa60d6792b` is the id of the track and `easy+money` is the updated track name

To DELETE an existing track:
`http DELETE :3000/api/track/590ca9dbb48fdcfa60d6792b`
where `590ca9dbb48fdcfa60d6792b` is the id of the track to be deleted


### Developer Dependencies: 
* Chai
* Chai-HTTP
* Debug
* Mocha
* Bluebird
