var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://albert:albert@ds119608.mlab.com:19608/meantodos_albert2016', ['todos']);

// Get todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err){
            res.send(err);
        }else{
            res.json(todos);
        }
    })
});

// Get single todos
router.get('/todos/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    },  function(err, todos){
        if(err){
            res.send(err);
        }else{
            res.json(todos);
        }
    })
});

//save todos
router.post('/todos', function(req, res, next){
    var todo = req.body;

    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error":"Invalid Data"
        });
    }else{
        db.save(todo, function(err, result){
                if(err){
                res.send(err);
                }else{
                res.json(result);
                }
        });
    }
});

//Update todo

router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updObj = {};

    if (todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }

    if(todo.text){
        updObj.text = todo.text;
    }

    if(!updObj){
        res.status(400);
        res.json({
            "error":"Invalid Data"
        });
    }else {
        db.todos.update({
            _id: mongojs.ObjectId(req.param.id)
        }, {}, function(err, result){
            if(err){
            res.send(err);
            }else{
            res.json(result);
            }
        });

    }
    
});


//delete todo

router.delete('/todo/:id', function(req, res, next){
   
        db.todos.remove({
            _id: mongojs.ObjectId(req.param.id)
        },'', function(err, result){
            if(err){
            res.send(err);
            }else{
            res.json(result);
            }
        });  
});



module.exports = router;