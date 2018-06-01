# ff14_scheduler
Tool to schedule raids for guilds using react/redux/node

To get started: 

- Clone codebase
- install required packages in root and /client directories
- you will need to set up the private keys yourself
- setting up config/keys_dev.js (for deployment to cloud): 
```
module.exports = {
  mongoURI: //database URI,
  secretOrKey: //your secret string,
  localKey: //your secret string
};
```

run npm run dev in the root directory
