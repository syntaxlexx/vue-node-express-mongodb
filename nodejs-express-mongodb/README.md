# Node Express MongoDB

## Starting server
The server can be restarted either via 
```bash
node server.js
```

OR automatically monitor changes to node server

```bash
nodemon server.js
```

You can also start from a specific server port
```bash
nodemon server.js 3006

nodemon server.js 8080
```

## Deploy to Production - PM2
- `git clone` on your specified folder 
- Start the app via **PM2** by running `pm2 start server.js`

Ypu can monitor your app via
```bash
// list all running applications
pm2 list 

// start new app
pm2 start server.js
pm2 start app.js

// pm2 describe <id|app_name>
pm2 monit

// Zero Downtime Reload
pm2 reload all

// To consult logs 
pm2 logs
pm2 logs APP-NAME       # Display APP-NAME logs
pm2 logs --json         # JSON output
pm2 logs --format       # Formated output

pm2 flush               # Flush all logs
pm2 reloadLogs          # Reload all logs

// monitor port
// get the PID by running
pm2 list
// then eye-ball the port via
sudo netstat -ano -p tcp | grep <PID>
```

