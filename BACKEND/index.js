const express = require('express');
var cors = require('cors');
const DB = require("./MONGODB.js");
const schema = require("./SCHEMA/SCHEMA.js");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/USERDATA", async (req, res) => {
  const TITLE = req.body.TITLE;
  const DATA = req.body.DATA;
  const MODEL = DB.model("userdatas", schema);
  const MODELDATA = new MODEL({ Title: TITLE, UserData: DATA });
  const DATASAVED = await MODELDATA.save();
})

app.get("/GETUSERDATA", async (req, res) => {
  const MODEL = DB.model("userdatas", schema);
  res.status(200).json({ data: await MODEL.find({}).lean() });
})

app.put("/USERUPDATE/:id", async (req, res) => {
  console.log(req.body);
  const ID = req.params.id;
  const TITLE = req.body.Title;
  const UPDATEDATA = req.body.UserData;
  const MODEL = DB.model("userdatas", schema);
  const MODELDATA = await MODEL.updateOne(
    { _id: ID },
    {
      $set: { Title: UPDATEDATA, UserData: TITLE }
    }
  )
})

app.delete("/USERDELETE/:id", async (req, res) => {
  const ID = req.params.id;
  const MODEL = DB.model("userdatas", schema);
  const MODELDATA = await MODEL.deleteOne(
    { _id: ID },
  )
})

app.put("/status/:id", async (req, res) => {
  console.log(req.body);
  const ID = req.params.id;
  const MODEL = DB.model("userdatas", schema);
  const MODELDATA = await MODEL.updateOne(
    { _id: ID },
    {
      $set: {
        StatusID: ID,
        Status: "completed"
      }
    }
  )
})

app.get("/userstatus", async (req, res) => {
  const MODEL = DB.model("userdatas", schema);
  res.status(200).json({ data: await MODEL.find({}).lean() });
})

app.listen(3001);
