const { Router } = require('express');
const routes = Router();
const path = require('path');
const mongoose = require('mongoose');

const TimeData = mongoose.model(
    "times",
    mongoose.Schema(
      {
        Times: Number    
      },
      { timestamps: true }
    )
  );

routes.post("/inputdata", (request, response) => {
    console.log(request.body);
    response.status = 200;
    response.sendFile(path.join(__dirname, "/index.html"));

});
routes.get("/giveMeMoney", async (request, response) => {
    console.log("Someone just requested money :D");
    const item = await TimeData.findById("6297fa63f951fae4d4fffffc");
    var date = new Date(item.Times * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(formattedTime);
    console.log(new Date(item.Times * 1000));

    var stuff = "Moneh";
    console.log(path.join(__dirname, "/index.html"))
    response.sendFile(path.join(__dirname, "/index.html"));

}
);
module.exports = routes;