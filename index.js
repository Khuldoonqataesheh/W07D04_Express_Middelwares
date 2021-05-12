
const express = require("express");
const app = express();
const port = 3000;

const users = ["John", "Mark"];

const products = ["keyboard" , "mouse"]
const logUsers  = (req,res,next)=>{
    console.log(users);
    next()
}

const logMethod   = (req,res,next)=>{
    console.log(req.method);
        next();
    
}

 app.use(logMethod)


app.use(logUsers)


 app.use(express.json())


app.get("/users", (req, res, next) => {
 if (users.length){
    res.json(users);
 } else{
    next("err")  
 }
  
});

app.use((error,req,res,next)=>{
   console.log("No users");
   
})

const userRouter = express.Router();
app.use("/users",userRouter);

userRouter.post("/create", (req, res , next) => {
    const name = req.body.name;
    users.push(name)
    res.send(users);
    next()
  });

  userRouter.use("/create",(req, res)=>{
      console.log(users)
      console.log(req.body)

  })

  const productsRouter = express.Router();
app.use("/products",productsRouter);

productsRouter.post("/update", (req, res , next) => {
    const name = req.body.name;
    products.splice(1,1,name)
    res.send(products);
    console.log(products)
    next()
  });

  productsRouter.use((req, res)=>{
    console.log(products)
    

})
app.use("*",()=>{
    next("err")
})
app.use((error,req,res,next)=>{
    res.status(404)
    console.log("NOT FOUND");

 })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});