const process = require("process");
const express = require("express");
const path=require("path")
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const cors=require("cors")
const userRoutes=require('./userRoutes')
const ConnectDb=require("./config")
const cookieParser = require('cookie-parser');
const app = express();
ConnectDb()
// console.log(process.env);
console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())
app.use('/',userRoutes)
app.use(cookieParser)

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});
