let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let toDoSchema = new Schema({
    task: {type: String},
    equipment: {type: String},
    location: {type: String},
    priority: {type: Number},
    completed: {type: Boolean, default: false}
});

let ToDo = mongoose.model('ToDo', toDoSchema);

router.delete('/:id', (req, res) => {
    let taskId = req.params.id;
    ToDo.findByIdAndRemove(taskId, (err, taskRemoved) => {
        if(err) {
            console.log('Error deleting task:', err);
            res.sendStatus(500);
        }else {
            res.sendStatus(200);
        }
    });
});

router.post('/', (req, res) => {
    console.log('POST /todo', req.body);
    let taskObject = req.body;
    console.log(req.body);
    let tastToAdd = new ToDo(taskObject);

    tastToAdd.save((err, savedTask) => {
        if(err) {
            console.log('mongodb error', err);
            res.sendStatus(500);
        }else {
            console.log('Saved task', savedTask);
            res.sendStatus(200);
        }
    });
});

router.get('/', (req, res) => {
    console.log('GET Task');
    ToDo.find( {}, (err, foundTask) => {
        if(err) {
            console.log('mongodb error in GET:', err);
        }else {
            console.log('Successfully getting Tasks!');
            res.send(foundTask);
        }
    });
});

module.exports = router;