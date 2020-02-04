import React from 'react';
import axios from 'axios';


class SignUp extends React.Component{
    state ={
        credentials: {
            username: '',
            password1: '',
            password2: ''
        }
    }
    addUser = e => {
        e.preventDefault();
        axios.post('https://lambda-mud-test.herokuapp.com/api/registration/ ', this.state.credentials)
        .then(res => {
            
            console.log('User created', res.data.key)
        })
        .catch(err => {
            console.log(err)
        });
    };
    handleChange = e => {
        this.setState({
            credentials:{
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };
    render(){ 
    return(
        <div>
            <h1>Our Game</h1>
            <p>Sign Up Here!</p>
            <form
            onSubmit={this.addUser}>
                <input
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.credentials.username}
                onChange={this.handleChange}
                required/>
                
                <input
                name="password1"
                type="password"
                placeholder='Password'
                value={this.state.credentials.password1}
                onChange={this.handleChange}
                required/>
                <input
                name="password2"
                type="password"
                placeholder="Confirm Password"
                value={this.state.credentials.password2}
                onChange={this.handleChange}
                required/>
                <button>Sign Up!</button>
            </form>
        </div>
    )}
}

export default SignUp;