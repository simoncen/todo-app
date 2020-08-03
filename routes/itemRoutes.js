const express = require('express');
const itemRoutes = express.Router();
let Item = require('../models/item');
let List = require('../models/list');

// create a new item
itemRoutes.route('/').post((req, res) => {
  List.findOne({ _id: req.body.listId})
    .then((list) => {
      let item = new Item(req.body);
      list.items.push(item);
      list.save()
        .then((list) => {
          res.status(200).json(item);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send('adding new item failed');
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('adding new item failed');
    });
});

// Alternative
// itemRoutes.route('/').post(async (req, res) => {
//   try {
//     let list = await List.findOne({ _id: req.body.listId });
//     let item = new Item(req.body);
//     list.items.push(item);
//     await list.save();
//     res.status(200).json(item);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send('adding new item failed');
//   }
// });

// update a new item
itemRoutes.route('/:id').put((req, res) => {
  List.findOne({ _id: req.body.listId}) // '' is optional for _id
    .then((list) => {
      list.items.id(req.params.id).set({
        description: req.body.description,
        completed: req.body.completed
      })
      list.save()
        .then((list) => {
          res.status(200).json(list.items.id(req.params.id));
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send('update item failed');
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('update item failed');
    });
});

// Alternatives
// itemRoutes.route('/:id').put(async (req, res) => {
//   try {
//     let list = await List.findOne({ _id: req.body.listId });
//     list.items.id(req.params.id).set({
//       description: req.body.description,
//       completed: req.body.completed
//     });
//     await list.save();
//     res.status(200).json(list.items.id(req.params.id));
//   } catch (err) {
//     console.log(err);
//     res.status(400).send('update item failed');
//   }
// });

// delete an item
itemRoutes.route('/:id').delete((req, res) => {
  List.findOne({ 'items._id': req.params.id }) // . is added before _id, therefore '' is needed.
    .then((list) => {
      list.items.id(req.params.id).remove();
      list.save()
        .then((list) => {
            res.status(200).send('item is deleted');
          })
        .catch((err) => {
          console.log(err);
          res.status(400).send('deleting item failed');
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('deleting item failed');
    });
})

// Alternatives
// itemRoutes.route('/:id').delete(async (req, res) => {
//   try{
//     let list = await List.findOne({ 'items._id': req.params.id });
//     list.items.id(req.params.id).remove();
//     await list.save();
//     res.status(200).send('item is deleted');
//   } catch (err) {
//     console.log(err);
//     res.status(400).send('deleting item failed');
//   }
// }

module.exports = itemRoutes;
