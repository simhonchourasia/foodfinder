import React, { useState, Component, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TinderCard from "react-tinder-card";
import './TinderCards.css';
import * as Io5Icons from "react-icons/io5";
import * as IoIcons from "react-icons/io";
import { IconButton } from '@material-ui/core';

export default class TinderCards extends Component {
    // const [ restaurants ] = useState([
    //     {name: 'Elon Tusk',
    //         imgUrl: 'https://media4.s-nbcnews.com/j/newscms/2018_48/2658326/181126-elon-musk-tesla-cs-952a_0d514a5ff2bfe11a4a17bcacaed8686f.fit-2000w.JPG'
    //     }, 
    //     {name: "Beff Jezos", imgUrl: 'https://api.time.com/wp-content/uploads/2020/07/jeff-bezos.jpg'}]);
    constructor(props) {
        super(props);
        this.swipeLeft = this.swipeLeft.bind(this);
        this.swipeRight = this.swipeRight.bind(this);
        // HARDCODED userId (username: Albert)
        //this.state = {userId: '6003c1d0f391200b6cfaa7dc', items: []};
        // HARDCODED userId (username: Barbara)
        this.state = {userId: '6003c1e5f391200b6cfaa7dd', items: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/')
            .then(response=>{
                console.log(response.data);
                const unswiped = response.data.filter(x=>x.swiped==='not yet')
                this.setState({items: response.data});
            })
            .catch(err=>{console.log(err);})
    }

    swipeLeft(id) {
        console.log('Swiping left for the user');
        const ind = this.state.items.findIndex(x=>x._id === id);
        const newItems = [...this.state.items];
        newItems[ind].swiped = 'left';
        this.setState({items: newItems});
        console.log(this.state);
        axios.post('http://localhost:5000/items/swipe/' + id, {swiped: 'left'})
            .then(res=>console.log(res.data));
        axios.post('http://localhost:5000/users/userswipe/' + this.state.userId, {restaurantId: id, swipe: 'left'})
            .then(res=>console.log(res.data))
        this.forceUpdate();
    }

    swipeRight(id) {
        console.log('Swiping right for the user');
        const ind = this.state.items.findIndex(x=>x._id === id);
        const newItems = [...this.state.items];
        newItems[ind].swiped = 'right';
        this.setState({items: newItems});
        console.log(this.state);
        axios.post('http://localhost:5000/items/swipe/' + id, {swiped: 'right'})
            .then(res=>console.log(res.data));
        axios.post('http://localhost:5000/users/userswipe/' + this.state.userId, {restaurantId: id, swipe: 'right'})
            .then(res=>console.log(res.data))
        this.forceUpdate();
    }

    swiped(direction, id, nameToDelete) {
        console.log("removing " + nameToDelete);
        console.log(direction);
        if (direction === 'left') this.swipeLeft(id);
        if (direction === 'right') this.swipeRight(id);
        //console.log(this.state);
    };

    outOfFrame(name) {
        console.log(name + "is gone");
    };

    render() {return (
        <div className='HomePage'>
            <div className='tinder-card'>
                <div className="tinderCards__cardContainer">
                {this.state.items.map((item)=> (
                    <TinderCard
                    className="swipe"
                    key={item.name}
                    preventSwipe={["up", "down"]}
                    onSwipe = {(dir) => this.swiped(dir, item._id, item.restaurant_name)}
                    onCardLeftScreen={() => this.outOfFrame(item.restaurant_name)}
                    >
                        <div 
                        style = {{backgroundImage: `url(${item.image_url})` }}
                        className="card">
                            <h3>{item.restaurant_name}</h3>
                            <p className='description'>{item.rating}</p>
                        </div>

                    </TinderCard>
                ))}
                </div>
            </div>
            <div className="swipeButtons">
                <IconButton className="swipeButtons__left">
                    <div className="theX">
                        <Io5Icons.IoClose />
                    </div>
                </IconButton>
                <IconButton className="swipeButtons__right">
                    <div className="theHeart">
                        <IoIcons.IoIosHeart style={{fill: '#55c16e'}}/>
                    </div>
                </IconButton>
            </div>
        </div>
    )}
}
