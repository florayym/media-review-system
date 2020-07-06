# media-review-system
<kbd>[**Getting started**](#getting-started)</kbd>

# Getting started

## Setup DB

```shell
# ./bin/mongod.cfg
#storage:
#  dbPath: D:\OneDrive - UC San Diego\Programming\data\db
#systemLog:
#  destination: file
#  logAppend: true
#  path: D:\OneDrive - UC San Diego\Programming\data\log\mongod.log
#security:
#  authorization: enabled
> mongod --config "D:\Program Files\MongoDB\Server\4.2\bin\mongod.cfg"

# Method 1
> mongod --dbpath d:\%PATH_TO_DATA_DIRECTORY%\data\db --bind_ip 127.0.0.1 
# Method 2, cmd run as administration
> net start mongodb

> mongo
# In MongoDB default database is test. If you didn't create any database, then collections will be stored in test database.
> use admin
> db.createUser({user: "superAdmin", pwd: passwordPrompt(), roles: [{role: "root", db: "admin"}]});
# Using "superAdmin" to create other users. Create the user right in the database where you will use it. For example, create "mediaMgr" user in the db "media-system" with a prompt password.
> use media-system
> db.createUser({user: "mediaMgr", pwd: passwordPrompt(), roles: [{role: "dbOwner", db: "media-system"}]});
```
chect it out in robo3t

## Installation

```shell
> git clone git@github.com:florayym/media-review-system.git
> npm install -g create-react-app
> npx express-generator
> npm i -g nodemon
# or try npm install --save-dev nodemon
> cd media-review-system
> npm install
> cd app
> npm install
> cd ../server
> npm install
```
test APIs with Postman

## Other dependencies

OpenStack Ussuri ⦙ FFmpeg ⦙ ImageMagick ⦙ Ghostscript

## Usage

In media-review-system:
```shell
> npm run dev
```