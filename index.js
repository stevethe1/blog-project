const routes = require('./routes/routes.js');
const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = process.env.PORT || 5000;                  //Save the port number where your server will be listening
const bodyParser = require('body-Parser');
const methodOverride = require('method-override');

//app.use(express.json());
app.set('view engine', 'ejs'); // use views with ejs
app.use(express.static('public')); // serve static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/', routes);

//Idiomatic expression in express to route and respond to a client request
//app.get('/', (req, res) => {        //get requests to the root ("/") will route here
//    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
//});



app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});