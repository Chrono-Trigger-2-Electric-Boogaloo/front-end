import React from 'react';
import axios from 'axios';
import styled from 'styled-components'

const StyledSignUp = styled.div `
height: 105vh;
margin: 0 auto;
background-image: url('mostafa-meraji-GKUe0gaACzs-unsplash.jpg')

`
const Card = styled.div`
background: rgb(254, 207, 140);
margin-left: 30%;
width: 25%;
border-radius: 10%;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
padding: 2px 16px;
:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`

const Inputs = styled.div`
padding-bottom:5%;
`

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
        axios.post('https://chronotrigger-remake.herokuapp.com/api/registration/ ', this.state.credentials)
        .then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.key))
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
        <StyledSignUp>
            <Card>
            <h1>Our Game</h1>
            <p>Sign Up Here!</p>
            
            <form
            onSubmit={this.addUser}>
                <Inputs>
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
                </Inputs>
            </form>
            </Card>
        </StyledSignUp>
    )}
}

export default SignUp;