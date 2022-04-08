const express = require('express')
const app = express()
const port = 3000
var jwt = require('jsonwebtoken');

const cors = require('cors');
const { createAccount, signInWithUsernameAndPassword } = require('./my-modules/auth');
const { createVehicule, ListVehicules, VehiculesDelete, finById, updateVehicule } = require('./my-modules/vehicules');
const { createIntevention, findByVehiculeId,deleteIntervention } = require('./my-modules/Intervention');
const { createParking, findByVehicule,ParkingDelete} = require('./my-modules/parking');

app.use(cors());



app.use(function(req,res,next){
  console.log(new Date().getTime());


  if (req.url === "/signin") {
    next();
  }else if( req.url === "/signup" ){
    next();

  }else{
        // verify the access token !!
        if (req.headers.authorization != null) {
          const token  = req.headers.authorization;
    
          try {
            let decod = jwt.verify(token,'abcd');
            console.log(decod);
    
            
            next();
          } catch (error) {
            res.send("session expired")
          }
    
    
        }else{
          res.send("oups access denied no token present")
        }
  }


  
})




// ROUTE GET
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/signin',(req,res)=>{
  signInWithUsernameAndPassword(req,res)
})


app.post('/signup',(req,res)=>{
  createAccount(req,res);
})


app.get('/api/user/connected', (req, res) => {
  const token  = req.headers.authorization;
    
  try {
    let decod = jwt.verify(token,'abcd');
    console.log(decod);
      let user = decod.user;

      delete user.password;

      res.send(user)
  } catch (error) {
    res.send("session expired")
  }
})




/******************** vehicules  APIs ********************* */
app.post('/api/vehicules/add',(req,res)=>{
  createVehicule(req,res);
})


app.post('/api/vehicules/update',(req,res)=>{
  updateVehicule(req,res);
})

app.post('/api/vehicules/delete',(req,res)=>{
    VehiculesDelete(req,res);
})
app.post('/api/intervention/delete',(req,res)=>{
  deleteIntervention(req,res);
})
app.post('/api/parking/delete',(req,res)=>{
  ParkingDelete(req,res);
})

app.post('/api/vehicules/intervention/add',(req,res)=>{
  createIntevention(req,res);
})
app.post('/api/vehicules/parking/add',(req,res)=>{
  createParking(req,res);
})

app.get('/api/vehicules/list',(req,res)=>{
  ListVehicules(req,res);
})

app.get('/api/vehicules/details',(req,res)=>{
  finById(req,res);
})


app.get('/api/vehicules/inteventions/list',(req,res)=>{
  findByVehiculeId(req,res);
})
app.get('/api/vehicules/parking/list',(req,res)=>{
  findByVehicule(req,res);
})
app.get('/api/vehicules/parking/delete',(req,res)=>{
  ParkingDelete(req,res);
})


 





app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})