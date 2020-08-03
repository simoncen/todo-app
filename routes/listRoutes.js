const express = require('express');
const listRoutes = express.Router(); //A Router instance is a complete middleware and routing system
let List = require('../models/list'); // model, mongoose is included in this file

// syntax is javascript. save, find, populate, and get are all mongoose api

// get all todo list -- GET
listRoutes.route('/').get((req, res) => { // request, responce
  // List.find().populate('item').exec((err, lists) => { // .find() to query all the list from mongoDB, item is embedded in the List, if there's no ".populate()" for item, items will not be returned, .exec() --> execute
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send('getting new list failed');
  //   } else {
  //     res.json(lists); // send a json responce back to the client, javascript object notation
  //   }
  // });
  const userId = req.query.user_id; // the _id from the Query Results under the Request in MongoDB
  if (!userId) {
    res.status(200).json([]);
  } else {
    List.find({ userId: userId })
      .then(lists => {
        res.status(200).json(lists);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send('getting lists failed');
      });
  }
});


// create new list -- POST
listRoutes.route('/').post((req, res) => {
  let list = new List(req.body);
  list.save() // save it to mongoDB, API of mongoose, operate according to the schema under the models
    .then(list => { // success
      res.status(200).json(list); // 200 success ok, 300 redirect, will be shown at the Status icon in Postman
    })
    .catch(err => {
      console.log(err);
      res.status(400).send('adding new list failed'); // 400 error, http status code
    });
});

// delete a todo list - DELETE -- hard delete, delete the list in the database (soft delete, delete the list in the application)
listRoutes.route('/:id').delete((req, res) => { // :id is the query according to mongoose delete document
  List.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send('deleting list failed'); // which library does status and send belong to express
    } else{
      res.status(200).send('list is deleted');
    }
  })
})

module.exports = listRoutes;
