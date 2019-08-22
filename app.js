const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));

app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Authentication Service is Running.'
    });
});

//routes
app.use('/api/auth', require('./Controllers/AuthController'));

module.exports = app;