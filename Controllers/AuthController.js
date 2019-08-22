const express = require('express');
const router = express.Router();
const config = require('config');
const AuthService = require('../Services/AuthService');

router.post('/register', async (req, res) => {
    try {
        let register = await AuthService.Register(req.body, function(err, result) {
            if (err) {
                res.status(500).json({
                    error: err
                });
            }

            res.status(200).json(result);
        });
    } catch(err){
        console.error(err);
        res.status(500).json({
            error: {
                message: err.message
            }
        });
    }
});

module.exports = router;