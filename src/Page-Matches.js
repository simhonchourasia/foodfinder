import React, {Component} from 'react'
import axios from 'axios';
import './Page-Matches.css'

export default class Matches extends Component{
    constructor(props) {
        super(props);
        // HARDCODED userId (username: A)
        // DYLAN
        this.state = {userId: '6003c1d0f391200b6cfaa7dc', items: []};
    }

    componentDidMount() {
        // OLD; RETURNS ALL ITEMS WHICH HAVE BEEN SWIPED RIGHT ON BY CURRENT USER
        // axios.get('http://localhost:5000/items/')
        //     .then(response=>{
        //         console.log(response.data);
        //         const unswiped = response.data.filter(x=>x.swiped==='not yet')
        //         console.log(unswiped);
        //         this.setState({items: response.data});
        //     })
        //     .catch(err=>{console.log(err);})
        axios.get('http://localhost:5000/users/matches/'+this.state.userId)
            .then(res1=>{
                console.log(res1.data);
                axios.get('http://localhost:5000/items/')
                    .then(res2=>{
                        //console.log(res2.data)
                        const matches = res2.data.filter(x=>res1.data.includes(x._id));
                        console.log(matches);
                        this.setState({items: matches});
                    })
                    .catch(err=>{console.log(err);})
            })
            .catch(err=>{console.log(err);})
    }

    render() {return (
        <div className= 'matches'>
            <h1>
                Matches
            </h1>
            
            <div class="tiles">
                {this.state.items.map(item=>{
                    return (<div className='tile'>
                        <h4>{item.restaurant_name} | {item.rating} | {item.price} | {item.restaurant_url}</h4>
                        <img src={item.image_url} alt=''/>
                    </div>)
                })}
            </div>
        </div>
    )}
}

