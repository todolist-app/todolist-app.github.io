var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb+srv://marcosampedro:yungbhang@test-jompg.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true });

// Creating a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        // gets data from mongoDB and passes it to the view
        Todo.find({}, function(err, data){
            if (err) throw (err);
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // gets data from the view and adds it to mongoDB
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw (err);
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        // deletes the requested item frmo mongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw (err);
            res.json(data);
        });
    });
};