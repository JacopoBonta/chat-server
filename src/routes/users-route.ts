import express from 'express';

export const userRoute = express.Router();

userRoute.get('/users', (req, res) => {

})

userRoute.post('/users/auth', (req, res) => {
    const { email, username } = req.body;

    res.json({
        token: "abc123"
    })
})