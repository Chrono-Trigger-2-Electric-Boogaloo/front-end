import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledSignIn = styled.div `
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
class SignIn extends React.Component {
    state={ 
        credentials:{
            username: '',
            password: ''
        }
    };
    handleChange = e => {
        this.setState({
            credentials:{
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };
    handleSubmit = e => {
        // let localStorage;
        e.preventDefault();
        axios.post('https://lambda-mud-test.herokuapp.com/api/login/', this.state.credentials)
        .then(res => {
            console.log('Res', res.data.key)
           localStorage.setItem('token', JSON.stringify(res.data.key))
            console.log('Signed in with success')
            this.props.history.push('/Game');
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <StyledSignIn>
                <form onSubmit={this.handleSubmit}>
                    <Card>
                    <h1>Our Game</h1>
                    <p>Login Here!</p>
                    <Inputs>
                    <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={this.state.credentials.username}
                    onChange={this.handleChange}
                    required/>
                    <br/>
                    <input
                    type="password"
                    name="password"
                    value={this.state.credentials.password}
                    onChange={this.handleChange}
                    placeholder="password"
                    required/>
                    <button>Login</button>
                    </Inputs>
                    </Card>
                </form>
            </StyledSignIn>
        )
    }
}

export default SignIn;