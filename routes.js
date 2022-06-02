const { Router, response } = require('express');
const routes = Router();
const path = require('path');
const mongoose = require('mongoose');
const { count } = require('console');
const res = require('express/lib/response');

const TimeData = mongoose.model(
    "times",
    mongoose.Schema(
      {
        Times: Number, 
        Counters: Number   
      },
      { timestamps: true }
    )
  );

routes.post("/inputdata", async(request, response) => {
    console.log(request.body);
    
    
    if(request.body.password == "123"){
        var counter = 0;
        
        let count = await TimeData.count();

        
        TimeData.find({}, function(err, result){
            console.log(result);
        });
        
        

        var aReallyCoolString = `<!DOCTYPE html>
        <html>
        <body>
        <table style="background-color: darkgrey; padding: 10px; border: 1px solid black; cellspacing= 15px;">
        <tr>
            <th>Date</th>
          <th>Time</th>
          
        </tr>`;

        


        for(let i = 0; i < count; i++){
            
            const data = await TimeData.find({Counters: `${count - i}` }).exec();
            
            var date = new Date(data.Times * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            
            var date = date.getDay() - 5 + " : " + date.getMonth() + 1 + " : " + date.getFullYear();
            var formattedTime = hours + ':' + minutes.substr(-2);
            console.log(date);
            console.log(formattedTime)
            console.log(data.Times)
            aReallyCoolString = aReallyCoolString + `
        <tr>
            <td>${date}</td>
            <td>${formattedTime}</td>
            
            
        </tr>`;
        }
        aReallyCoolString = aReallyCoolString + ` 
        </table> 
        </body>
        </html>`;
       
        
    }else{
        
    }
    console.log("Sent database content");
    response.send(aReallyCoolString);

});

routes.get("/addTime", async (request, response) => {
    var currentDoT = Math.floor(new Date().getTime() / 1000);
    let count = await TimeData.count();
    var updatedCount = count + 1;
    const newShid = new TimeData({Times: `${currentDoT}`, Counters: `${updatedCount}`});
    response.sendFile(path.join(__dirname, "/index.html"));
    console.log(updatedCount);
    await newShid.save();
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