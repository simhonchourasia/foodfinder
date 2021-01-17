const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.route('/').get((req, res)=>{
    Item.find()
        .then(items=>res.json(items))
        .catch(err=>res.status(400).json('Error 400 in GET'));
});

router.route('/add').post((req, res)=>{
    const restaurant_name = req.body.restaurant_name;
    const rating = req.body.rating;
    const address = req.body.address;
    const price = req.body.price;
    const image_url = req.body.image_url;
    const restaurant_url = req.body.restaurant_url;
    const restaurant_phone_number = req.body.restaurant_phone_number;
    
    const newItem = new Item({restaurant_name, rating, address, price, image_url, restaurant_url, restaurant_phone_number});
    
    newItem.save()
        .then(()=>res.json('Item added! '))
        .catch(err=>res.status(400).json('Error 400 in POST'));
});

router.route('/:id').get((req, res)=>{
    Item.findById(req.params.id)
        .then(item=>res.json(item))
        .catch(err=>res.status(400).json('Error 400 in GET'));
});

router.route('/update/:id').post((req, res)=>{
    console.log(req.body)
    console.log(req.params)
    Item.findById(req.params.id)
        .then(item=>{
            item.restaurant_name = req.body.restaurant_name;
            item.rating = req.body.rating;
            item.address = req.body.address;
            item.price = req.body.price;
            item.image_url = req.body.image_url;
            item.restaurant_url = req.body.restaurant_url;
            item.restaurant_phone_number = req.body.restaurant_phone_number;
            item.swiped = req.body.swiped;

            item.save()
                .then(()=>res.json('Updated item. '))
                .catch(err=>res.status(400).json('Error 400 in POST (update)'));
        })
        .catch(err=>res.status(400).json('Error 400 in POST [update]'));
});


router.route('/swipe/:id').post((req, res)=>{
    Item.findById(req.params.id)
        .then(item=>{
            item.swiped = req.body.swiped;
            item.save()
                .then(()=>res.json('Swiped on item. '))
                .catch(err=>res.status(400).json('Error 400 in POST (swipe)'));
        })
        .catch(err=>res.status(400).json('Error 400 in POST [swipe]'));
})

module.exports = router;