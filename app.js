const spdy       = require('spdy');
const app        = require('express')();
const bodyParser = require('body-parser');
const fs         = require('fs');
const port       = (process.env.PORT || 3000);

// Set patterns to the bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Define routers
app.use((req, res, next) => {
	res.end("Xuxu");
});

// SSL options
var options = {
  key: fs.readFileSync('./server/security/localhost.key'),
  cert: fs.readFileSync('./server/security/localhost.cert')
};

spdy.createServer(options, app).listen(port);