# meida-review-system
<kbd>[**Getting started**](#getting-started)</kbd>

# Getting started

## Setup DB

```shell
# ./bin/mongod.cfg
#security:
#  authorization: enabled
> mongod --config "D:\Program Files\MongoDB\Server\4.2\bin\mongod.cfg"

# Method 1
> mongod --dbpath d:\Programming\data\db --bind_ip 127.0.0.1 
# Method 2, cmd run as administration
> net start mongodb

> mongo
# In MongoDB default database is test. If you didn't create any database, then collections will be stored in test database.
> use admin
> db.createUser({user: "superAdmin", pwd: passwordPrompt(), roles: [{role: "root", db: "admin"}]});
# 使用superAdmin具有的root权限用户创建其它用户。在哪个数据库db中使用, 就在哪个db中新创建用户
> use media-system
> db.createUser({user: "mediaMgr", pwd: passwordPrompt(), roles: [{role: "dbOwner", db: "media-system"}]});
```
chect it out in robo3t

## Installation

```shell
> git clone git@github.com:florayym/media-review-system.git
> npm install
> cd app
> npm install
> cd ../server
> npm install
> cd ..
> npm run dev
```
test APIs with Postman

## Other dependencies

OpenStack Ussuri ⦙ FFmpeg ⦙ ImageMagick ⦙ Ghostscript
