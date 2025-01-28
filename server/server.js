const express = require("express"); //express
const mysql = require("mysql2"); 
const cors = require("cors");
const path = require("path"); 
const app = express(); 
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    credentials: true, // Allow cookies or authenticatio headers
  }));
  
app.use(express.json()); 

const port = 3001;
const db = require("./models") //./models
const companiesRoutes = require('./routes/companies');  //./routes
const userRoutes = require("./routes/User")  

app.use("/companies", companiesRoutes); //http://localhost:3001/api/companies
app.use("/User", userRoutes);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
       console.log(`listening on port ${port} `); //listening on port 3001
       
   });
});

























// app.post("/add_user", (req, res) => {
//     const sql =
//       "INSERT INTO dummydata.users (`Name`, `LName`, `Email`, `Address`, `username`, `CompanyName`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?)";
//       const values = [req.body.Name, req.body.LName, req.body.Email, req.body.Address, req.body.username, req.body.CompanyName, req.body.role];
//       db.query(sql, values, (err, result) => {
//       if (err)
//         return res.json({ message: "Something unexpected has occured" + err });
//       return res.json({ success: "successfully" });
//     });
//   });
  
//   app.get("/dummydata", (req, res) => {
//     const sql = "SELECT * FROM dummydata.users";
//     db.query(sql, (err, result) => {
//       if (err) res.json({ message: "Server error" });
//       return res.json(result);
//     });
//   });
  
//   app.get("/get_dummydata/:id", (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM dummydata.users WHERE `id`= ?";
//     db.query(sql, [id], (err, result) => {
//       if (err) res.json({ message: "Server error" });
//       return res.json(result);
//     });
//   });
  
//   app.post("/edit_user/:id", (req, res) => {
//     const id = req.params.id;
//     const sql =
//       "UPDATE dummydata.users SET `id`=?, `Name`=?, `LName`=?, `Email`=?, `Address`=?, `CompanyName`=? `username`=? WHERE id=?";
//     const values = [
     
//       req.body.Name,
//       req.body.LName,
//       req.body.Email,
//       req.body.Address,
//       req.body.CompanyName,
//       req.body.username,
//       req.body.role,
//       id,
//     ];
//     db.query(sql, values, (err, result) => {
//       if (err)
//         return res.json({ message: "Something unexpected has occured" + err });
//       return res.json({ success: " updated successfully" });
//     });
//   });
  
//   app.delete("/delete/:id", (req, res) => {
//     const id = req.params.id;
//     const sql = "DELETE FROM dummydata WHERE id=?";
//     const values = [id];
//     db.query(sql, values, (err, result) => {
//       if (err)
//         return res.json({ message: "Something unexpected has occured" + err });
//       return res.json({ success: " updated successfully" });
//     });
//   });
  



//http://localhost:3001/api/users
//const express = require('express');
// const cors = require('cors');
// const db = require("./models");
// const app = express();
// const userRouter = require('./routes/user');
// const companiesRouter = require('./routes/companies');
// app.use(express.json());
// app.use(cors()); 



// app.use("/user", userRouter);
// app.use("/companies", companiesRouter); 

// // Sync database and start the server
// db.sequelize.sync().then(() => {
//     app.listen(3001, () => {
//         console.log("Server running on port 3001");
//     });
// }).catch(err => {
//     console.error('Unable to connect to the database:', err);
// });

// module.exports = app;











// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "dummydata",
// });
