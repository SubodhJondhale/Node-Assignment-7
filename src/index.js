const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const initialData = require('./initialData');
const port = 4000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get('/api/student', (req, res) => {
    console.log(initialData)
    res.json(initialData);
  });

app.get('/api/student/:id', (req, res) => {
    const ids = req.params.id;
    let found = false;
    
    initialData.forEach((val) => {
      if (val.id == ids) {
        found = true;
        res.send(val);
      }
    });
    if (!found) {
      res.status(404).json({
        "status" :"not found"
      })
    }
  });
app.put("/api/student/:id",(req,res)=>{
    const ids = req.params.id;
    let found = 0;
    req.body.id=ids;
    initialData.forEach((val)=>{
        if(val.id == ids){
            found = 1;
            initialData[ids-1] = req.body;
            res.status(200).json({
                "status":"updated"
            })
        }
    })
    if(found==0){
        res.status(400).json({
        "status":"not valid id"
        })
    }
})
app.post("/api/student", (req, res) => {
    if (req.body.name && req.body.currentClass && req.body.division) {
      req.body.id = initialData.length + 1;
      initialData.push(req.body);
      res.json({
        "response": "success"
      });
    } 
    else {
      res.status(400).send("Incomplete details");
    }
  });

  app.delete("/api/student/:id", (req, res) => {
    const ids = req.params.id;
    let found = false;
    initialData.forEach((val, index) => {
      if (val.id == ids) {
        found = true;
        initialData.splice(index, 1);
        res.send("Record removed");
      }
    });
    if (!found) {
      res.status(404).send("Invalid id");
    }
  });
  
  
app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app;   