var server = require(__dirname + '/server.js')();

var app 			= server.app.express();

app.engine('html', server.app.ejs.renderFile);
app.use(server.app.bodyParser.json());
app.use(server.app.morgan('dev'));
app.use(server.app.bodyParser.urlencoded({ extended: false }));
app.use(server.app.express.static(server.app.path.join(__dirname, 'public')));
app.use('/views', server.app.express.static(server.app.path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.use(server.app.methodOverride());

server.router(app)();

return server.app.http.createServer(app).listen(process.env.PORT || 3000, function(){
	console.log("Server is on, listening on: 3000");
});