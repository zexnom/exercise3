
const express = require('express')
const jwt = express('jsonwebtoken')
const app = express()
const port = 3000
let dbUsers = [
  {
      username: "ammar",
      password:"02Mar_25",
      name:"Muhammad Ammar",
      email:"ammarpauzan@gmail.com",
  },
  {
      username: "Jijul",
      password:"Jijul_Sem",
      name:"Azizul Hakim",
      email:"jijulsem@gmail.com",
  },
  
  {
      username: "Deen",
      password:"Deen_sem",
      name:"Hafizuddin",
      email:"deenSem@gmail.com",
  }
  ]
 
//get username and password user
app.use(express.json());

app.post('/',(req,res)=> {
  let data = req.body
  res.send(
    login(
      data.username,
      data.password,
      )
    );
});
app.post('/register',(req,res)=> {
  let data = req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
      )
    )
})

app.post('/login', (req, res) => {
  let data = req.body
  let user = login(data.username, data.password)
  res.send(
    generateToken(user)
  );
});

app.get('/hello', verifyToken, (req, res) => {
  res.send('Hello World!')
})
app.get('/bye',(req, res) => {
    res.send('Bye Bye World!!')
});

function verifyToken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'secret', function(err, decoded) {
    if(err){
      res.send("Invalid Token")
    }
    console.log(decoded) //bar
    
    req.user = decoded
    next()
  });
}
app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
});

function login(username,password){
  console.log("someone try to login with Username:",username,"Password:",password)
     let matched = dbUsers.find(element => 
          element.username == username
      )
      if(matched){
          if(matched.password == password){
              return matched
          }else{
              return "Password not matched"
          }
      }else {
          return "Username not matched"
      }
      
}
function register(newusername,newpassword,newname,newemail){
//ToDo:Check if username exist
console.log("Registering account.......")
let exist = dbUsers.find(element => element.username == newusername )
if(exist){ 
  return "Username already exists"
}
else {
  dbUsers.push({
  username : newusername,
  password : newpassword,
  name : newname,
  email : newemail,
  }
)
return "Account created........"
  
}
}
function generateToken(userProfile){
  return jwt.sign(
    userProfile,
    'secret',
  {expiresIn: 60 * 60})
  
}