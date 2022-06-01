import express from 'express';
import dotenv from 'dotenv';



const app = express();
dotenv.config();
app.get("/giveMeMoney", (request , response) =>
  {
    console.log("Someone just requested money :D");
    console.log(request.query);
    console.log(process.env.Loknor)
    var stuff = "Moneh";
    response.write(`
    <!DOCTYPE html>
    <html>

    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
    Haha i just received something -> ${Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(request.query.currency)}
    </body>
    </html> 
    `);
    
  }
);

app.listen(3000, () =>
  console.log('Example Hugo listening on port 3000! '),
  
);
