const Oil_Production = require('../controllers').oilProd;
const Oil_Consumption = require('../controllers').oilCon;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  //Add oil pro/con data to db from csv
  app.get('/api/add/Oil_Production', Oil_Production.createCSV);
  app.get('/api/add/Oil_Consumption', Oil_Consumption.createCSV);

  //Get oil pro/con data from db
  app.get('/api/get/Oil_Production', Oil_Production.fetchData);
  app.get('/api/get/Oil_Consumption', Oil_Consumption.fetchData);

};
