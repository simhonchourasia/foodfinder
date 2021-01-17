import React, {Component} from 'react'
import axios from 'axios';

export default class Matches extends Component{
    constructor(props) {
        super(props);
        // HARDCODED userId (username: A)
        this.state = {userId: '60035e9a8d49d4244ce91aa5', items: []};
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
                        console.log(res2.data)
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
            
            {this.state.items.map(item=>{
                return <h4>{item.name} | {item.description}</h4>
            })}
            
        </div>
    )}
}

