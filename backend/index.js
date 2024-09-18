const express = require('express')
const app = express();
const connectDB = require("./db/index")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes');
const isAuthenticated = require('./middlewares/auth');
const port = 8080;



//Mongoose

connectDB()
    .then(() => {
        console.log("Mongo connection successful");
    })
    .catch((err) => {
        console.log(`Mongo error ${err}`);
        throw err
    })

//Middlewares

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello")
})


app.use("/api", userRoutes);
app.use("/products", productRoutes)


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})