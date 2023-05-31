var express = require('express');
var router = express.Router();
const passport = require('../middleware/passport')
var path = require('path');
/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });
router.get('/logout', function(req, res) {
    // req.logout();
    res.redirect('/');
})
router.get('/login', function(req, res) {
    // req.logout();
    res.redirect('/');
})
router.post('/login', passport.authenticate('local', { session: false, failureRedirect: '/err' }), (req, res, next) => {
    //console.log(req.user.token)
    if (!req.user) {
        res.status(401).send();
    }
    if (req.user) {
        //res.cookie('jwt',req.user.token,{secure:true,httpOnly:true})
        // console.log('tokennnnn ' ,req.user.token)
        res.set({
            'Authorization': req.user.token
        })
        res.header('Authorization', req.user)
        res.status(200).send(req.user);
        //res.redirect(`/chat?token=${req.user.token}&user=`);
    }
});
router.get("/login", (request, response) => response.sendFile(path.join(__dirname, '../public/login.html')));
router.get('/err', (req, res) => { res.status(401).json('Not autorized') });
module.exports = router;