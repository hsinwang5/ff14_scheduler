# scheduler app
Tool to schedule raids for guilds using react/redux/node

To get started: 

- Clone codebase
- install required packages in root and /client directories
- you will need to set up the private keys yourself
- place your keys in config/keys_dev.js: 
```
module.exports = {
  mongoURI: //mongoDB database,
  secretOrKey: //your secret string,
  localKey: //your secret string
};
```
- You need a mongoDB database to connect to
- type "npm run dev" (minus quotes) in the root directory in console to start app
