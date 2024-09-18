const express = require('express');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();

const products = [{
    name: "Mobile",
    price: 20000
},
{
    name: "watch",
    price: 5000
}]

router.get("/", isAuthenticated, (req, res) => {

    res.status(200).json(products)
})


module.exports = router;