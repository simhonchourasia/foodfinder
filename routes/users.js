const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({extended: false});

router.route('/').get((req, res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error 400 in GET'));
})

router.route('/add').post((req, res)=>{
    console.log(req.body);
    const username = req.body.username;
    const partner = req.body.partner;
    //const swipedOn = req.body.swipedOn;
    //const liked = req.body.liked;
    
    //const newUser = new User({username, partner, liked, swipedOn});
    const newUser = new User({username, partner});
    console.log(newUser);
    newUser.save()
        .then(()=>res.json('User ' + username + ' has been added with partner ' + partner))
        //.catch(err=>res.status(400).json('Error 400 in POST'));
        .catch(err=>res.status(400).json(err));
})

//router.post('/userswipe/:id', urlencodedParser, (req, res)=>{
router.route('/userswipe/:id').post((req, res)=>{
    console.log("req.body from users.js: ", req.body);
    console.log("req.params from user.js: ", req.params)
    User.findById(req.params.id)
        .then(user=>{
            if (req.body.swipe === 'right'){
                console.log('swiped right - user');
                console.log('1', user);
                user.liked.push(req.body.movieId);
                console.log('2', user);
                user.swipedOn.push(req.body.movieId);
                console.log('3', user);
                user.save()
                    .then(()=>res.json('Swiped right on item. '))
                    .catch(err=>res.status(400).json('Error 400 in POST (swipe right)'));
            }
            if (req.body.swipe === 'left'){
                user.swipedOn.push(req.body.movieId);
                user.save()
                    .then(()=>res.json('Swiped left on item. '))
                    .catch(err=>res.status(400).json('Error 400 in POST (swipe left)'));
            }
        })
        .catch(err=>res.status(400).json('Error 400 in POST [swipe]'));
})

router.route('/matches/:id').get((req, res)=>{
    console.log('Finding matches...');
    User.findById(req.params.id)
        .then(user=>{
            console.log('Found original user');
            User.findOne({username: user.partner})
                .then(partnerUser=>{
                    const partnerId = partnerUser._id;
                    console.log(partnerId);
                    User.findById(partnerId)
                        .then(partner=>{
                            const matched = user.liked.filter(value=>partner.liked.includes(value));
                            // remove duplicates
                            const uniques = [...new Set(matched)];
                            res.json(uniques);
                        })
                        .catch(err=>res.status(400).json('Error 400 in GET (matches)'));
                })
        })
        .catch(err=>res.status(400).json('Error 400 in GET [matches]'));
})


module.exports = router;