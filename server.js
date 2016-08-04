// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content 






app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// tell the express app to listen on port 8000
// app.listen(8000, function() {
//  console.log("listening on port 8000");
// })




// this selects our port and listens
// note that we're now storing our app.listen within
// a variable called server. this is important!!
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
// this is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
var io = require('socket.io').listen(server)



// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
  console.log(socket.id);
  //all the socket code goes in here!

  var names = [];

  // New code added here ->
	socket.on("got_a_new_user", function (data){
        console.log('Got a new user!  Name: ' + data.name);
        console.log(socket.id);

        var id = socket.id;

        names[id] = data.name;

        io.emit('new_user_in_chat', {id: id, name: data.name, users: names});

        console.log(names);

    })

  
})