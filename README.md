# scheduler app
Tool to schedule raids for guilds using react/redux/node. Currently under development.

To get started: 

- Clone codebase with console command "git clone https://github.com/hsinwang5/ff14_scheduler"
- install required packages in root and /client directories - type "npm install" in both root and client folders
- you will need to set up the private keys yourself
- create a .js file and place in config/keys_dev.js with the following information: 
```
module.exports = {
  mongoURI: //mongoDB database info,
  secretOrKey: //your secret random string,
  localKey: //your secret random string
};
```
- You need a mongoDB database to connect to
- type "npm run dev" (minus quotes) in the root directory in console to start app
