
const express = require('express');
const app = express();

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.get("/", (req, res) => {
  res.send("Hello World");
});

/** 3) Serve an HTML file */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
app.get("/json", function(req, res) {
  res.json({"message": "Hello json"});
});

/** 6) Use the .env file to configure the app */
let messageObject = {"message": "Hello json"};
app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
     var u_=JSON.parse(JSON.stringify(messageObject ));
     u_.message=u_.message.toUpperCase();
     return res.json(u_);
  } else {
      return res.json(messageObject);
  }
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.use(function middleware(req, res, next) {
  var string = req.method + ' ' + req.path + ' - ' + req.ip;
  console.log(string);
  next();
});

/** 8) Chaining middleware. A Time server */
app.get("/now", middleware(req, res, next) {
  req.string = "example";
  next();
},
  function (req, res) {
      res.send(req.string);
  });

/** 9)  Get input from client - Route parameters */
app.get("/:echo/echo", function(req, res) {
  res.json(req.params);
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", function(req, res) {
   var firstName = req.query.first;
   var lastName = req.query.last;
   let jsonObj = { name: `${firstname} ${lastname}` };
   res.send(jsonObj);
 });

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
const bodyParser = require('body-parser');

/** 12) Get data form POST  */
app.use(bodyParser.urlencoded({extended: false}))

app.post("/form", function(req, res) {
  res.send(req.body.str.split('').reverse().join(''))
});



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
