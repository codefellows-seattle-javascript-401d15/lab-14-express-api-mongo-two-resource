# Goals:
* Create a class of Summoner objects in the database
  * Each Summoner will be able to "own" multiple minions
* Create a class of Minion objects in the database
  * Each minion will be assigned to a Summoner


### Instructions for using the API:

#### Summoner
* POST:
  ```http://localhost:4000/api/summoner```
* GET all:
  ```http://localhost:4000/api/summoner```
* GET one:
  ```http://localhost:4000/api/summoner/:summonerId```
* PUT:
  ```http://localhost:4000/api/summoner/:summonerId/minion/:minionId```
* DELETE:
  ```http://localhost:4000/api/summoner/:summonerId```

#### Minion
* POST:
  ```http://localhost:4000/api/minion/:summonerId```
* GET all:
  ```http://localhost:4000/api/minion```
* GET one:
  ```http://localhost:4000/api/minion/:minionId```
* PUT:
  ```http://localhost:4000/api/minion/:minionId```
* DELETE:
  ```http://localhost:4000/api/minion/:minionId```
