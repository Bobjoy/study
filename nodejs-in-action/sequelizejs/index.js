var Sequelize = require('sequelize');

/*
var sequelize = new Sequelize('study', 'root', '123456', {
	host: 'localhost',
	dialect: 'mysql' | 'sqlite',
	
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	
	// SQLite only
	storage: 'path/to/database.sqlite'
});
*/

// Or you can simple use a connection url
var sequelize = new Sequelize('mysql://localhost:3306/study', {
	username: 'root', password: '123456'
});

var User = sequelize.define('User', {
	username: Sequelize.STRING,
	birthday: Sequelize.DATE
});

sequelize.sync({force: true}).then(function(){
	// Table created
	return User.create({
		username: 'janedoe',
		birthday: new Date(1980, 6, 28)
	});
}).then(function(jane){
	console.log(jane.get({
		plain: true
	}))
});