import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props){
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePartner = this.onChangePartner.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            partner: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
            partner: this.state.partner
        })
    }

    onChangePartner(e) {
        this.setState({
            username: this.state.username,
            partner: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            partner: this.state.partner,
            swipedOn: [],
            liked: []
        };
        console.log(newUser);
        axios.post('http://localhost:5000/users/add', newUser)
            .then(res=>console.log(res.data));

        this.setState({
            username: '',
            partner: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Join</h3>
                <form onSubmit = {this.onSubmit}>
                    <div>
                        <label>Username: </label>
                        <input type='text'
                                required value={this.state.username} onChange={this.onChangeUsername}/>
                        <label>Partner: </label>
                        <input type='text'
                                required value={this.state.partner} onChange={this.onChangePartner}/>
                    </div>
                    <input type='submit' value='Create Account'/>
                </form>
            </div>
        )
    }
}
