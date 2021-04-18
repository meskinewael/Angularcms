const express = require('express');
const router = express.Router();
const User =require('../models/user');
const passport =require('passport');

router.post('/login',passport.authenticate('local',{
	successRedirect: '/auth/success',
	failureRedirect: '/auth/failure'
}));
router.get('/success',(req,res)=>{
	res.status(200).json({msg: 'logged in'});
})
router.get('/failure',(req, res)=>{
res.status(200).json({msg: 'Notlogged In'});
});

router.post('/register', (req, res) => {
	console.log('user from req.body >>>', req.body);
	const newUser = new User(req.body);
	newUser.save((err, user) => {
		if (err) {
			return res.status(500).json(err);
		}
		// we login the user that has just been created
		req.logIn(req.body, (err) => {
			if(err) {
				console.error('err in register | req.logIn()', err);
			}
		});
		res.status(201).json(user);
	});
});
router.get('/logout',(req,res)=>{
	req.logOut();
	res.status(200).json({mesg:'logout sucssess'});
})
module.exports = router;