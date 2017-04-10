var lionRouter = require('express').Router();

var lions = [];
var id = 0;

var updateId = (req, res, next) => {
  id++;
  req.body.id = id + '';
  next();
};

lionRouter.param('id', (req, res, next, id) => {
  let selectedLion = lions.filter(lion => lion.id === id);
  req.body = selectedLion;
  next();
})
.get('/', (req, res) => {
  res.json(lions);
})
.get('/:id', (req, res) => {
  var lion = req.todo;
  res.json(lion || {});
})
.post('/', updateId, (req, res) => {
  var lion = req.body;
  lions.push(lion);
  res.json(lion);
})
.put('/:id', (req, res) => {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

module.exports = lionRouter;
