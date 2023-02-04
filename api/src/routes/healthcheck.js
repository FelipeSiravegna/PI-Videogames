const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.status(200).json("Todo ok!")
    } catch (error) {
        console.error(error);
        res.status(404).json("Error");
    }
})

module.exports = router;