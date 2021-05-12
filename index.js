const { log } = require("console");
const express = require("express");
const { CLIENT_RENEG_LIMIT } = require("tls");
const app = express();
const port = 3000;

const users = ["John", "Mark"];


const logUsers  = (req,res,next)=>{
    console.log(users);
    next()
}

const logMethod   = (req,res,next)=>{
    console.log(req.method);
        next();
    
}
app.use("/users",logMethod)


app.use(logUsers)


 app.use(express.json())


app.get("/users", (req, res, next) => {
  res.json(users);
  next("err")
});

app.use((error,req,res,next)=>{
   console.log("No users");
   
})

const authRouter = express.Router();
app.use("/users",authRouter);

authRouter.post("/create", (req, res) => {
    const name = req.body.name;
    users.push(name)
    res.send(users);
  });

  authRouter.use("/create",()=>{
      console.log(req.body.name)
  })
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});