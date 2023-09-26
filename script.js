const { log } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');

// Logger Middleware
const loggerMiddleware = (req, res, next) => {
    // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    let logContent = [];
    let buffer;
    // [logContent['date'], logContent['method'], logContent['url']] = ["new Date().toISOString()", req.method, req.url]
    logContent.push(new Date().toISOString(),req.method,req.url);
    // logContent.push(req.method);
    // logContent.push(req.url);
    buffer = logContent.join('');
    // console.log(logContent);
    // console.log(`%c${buffer}`, "color: green");
    console.log('\x1b[4m\x1b[32m%s\x1b[0m',`${buffer} $:`);
    // logContent=logContent.toJson();
    // console.log(logContent);
    fs.appendFile('log.txt', buffer+"\n" ,err => {
        if(err) {
            console.error(err.message);
    }});
    next();
  };
  
  // Custom Middleware
  const customMiddleware = (req, res, next) => {
    // Perform some custom logic here
    next();
  };

// Middleware Registration
app.use(loggerMiddleware);
//   app.use(customMiddleware);

app.get('/',(req,res)=> {
    res.send('Hello word!');
})
app.get('/users',(req,res)=> {
    res.send('users page!');
})

app.use((req, res, next) => {
    res.status(404).json({error : 'Page not found'});
});
app.use((err, req, res, next) => {
    // Default error status code
    const statusCode = err.statusCode || 500;

    // Default error message
    const message = err.message || 'Internal Server Error';
    
    // Sending the error response
    res.status(statusCode).json({ error: message });
});
    

app.listen(3000, () => {
console.log('Server is listening on port 3000');
});




// // Route handler
// app.get('/users/:id', (req, res, next) => {
//   const userId = req.params.id;

//   // Simulating an error when user is not found
//   if (!getUserById(userId)) {
//     const error = new Error('User not found');
//     error.statusCode = 404;
//     next(error);
//   } else {
//     // If user is found, send the user data as response
//     const user = getUserById(userId);
//     res.json(user);
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   // Default error status code
//   const statusCode = err.statusCode || 500;

//   // Default error message
//   const message = err.message || 'Internal Server Error';

//   // Sending the error response
//   res.status(statusCode).json({ error: message });
// });

// Starting the server

// Colors reference
/* 
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"
FgGray = "\x1b[90m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
BgGray = "\x1b[100m"
*/

/*
the purpose of environnement : .env
url of DB 
secret key
.
.
.
*/

