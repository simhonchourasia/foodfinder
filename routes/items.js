const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.route('/').get((req, res)=>{
    Item.find()
        .then(items=>res.json(items))
        .catch(err=>res.status(400).json('Error 400 in GET'));
});

router.route('/add').post((req, res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const imgUrl = req.body.imgUrl;
    const swiped = req.body.swiped;
    
    const newItem = new Item({name, description, imgUrl, swiped});
    
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
            item.name = req.body.name;
            item.description = req.body.description;
            item.imgUrl = req.body.imgUrl;
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