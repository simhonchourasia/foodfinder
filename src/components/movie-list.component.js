import React, {Component, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Item = props=>{
    return (
        <tr>
            <td>{props.item.name}</td>
            <td>{props.item.description}</td>
            <td>{props.item.swiped}</td>
            <td>
                <a href='#' onClick={()=>{props.swipeLeft(props.item._id)}}>Swipe left</a>
                <a href='#' onClick={()=>{props.swipeRight(props.item._id)}}>Swipe right</a>
            </td>
        </tr>
    )
}

export default class MovieList extends Component {
    constructor(props){
        super(props);
        this.swipeLeft = this.swipeLeft.bind(this);
        this.swipeRight = this.swipeRight.bind(this);
        this.state = {userId: '60035c34f231b446447f3c49', items: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/')
            .then(response=>{
                this.setState({items: response.data});
                console.log(response.data);
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
        axios.post('http://localhost:5000/users/userswipe/' + this.state.userId, {movieId: id, swipe: 'left'})
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
        axios.post('http://localhost:5000/users/userswipe/' + this.state.userId, {movieId: id, swipe: 'right'})
            .then(res=>console.log(res.data))
        this.forceUpdate();
    }

    movieList() {
        return this.state.items.map(curr=>{
            return <Item item={curr} swipeLeft={this.swipeLeft} swipeRight={this.swipeRight} key={curr._id}/>;
        });
    }

    onSubmit(e) {
        e.preventDefault();

    }

    render() {
        return (
            <div>
                <h3>Movies</h3>
                <form onSubmit={this.onSubmit}>

                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Swiped?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.movieList()}
                    </tbody>
                </table>
            </div>
        );
    }

}