let Location = require('../models/locationsModel.js');
let template = require('./controllerTemplate.js');

module.exports = (() => {
  let locationsController = template.clone({
    path: '/api/locations'
  });

  let router = locationsController.router;
  router.get('/', (req, res) => {

  });
  router.post('/', (req, res) => {

  });
  router.put('/', (req, res) => {

  });
  router.delete('/', (req, res) => {

  });


  return locationsController;
})();
