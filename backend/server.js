const app = require("./app");

app.listen(process.env.PORT,()=>{
   console.log(process.env.PORT);
})