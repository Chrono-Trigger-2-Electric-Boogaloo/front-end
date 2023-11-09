import React from 'react';
import axios from 'axios';

class SignIn extends React.Component {
    constructor(props){
        super(props)

    this.state={ 
        credentials:{
            username: '',
            password: ''
        },
        error: ''
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
        axios.post(`${process.env.REACT_APP_BACKEND_URL}api/login/`, this.state.credentials)
        .then(res => {
           localStorage.setItem('token', res.data.key)
            this.props.history.push('/play');
        })
        .catch(err => {
            this.setState({
                ...this.state,
                error: 'Incorrect email or password'
            })
            console.log(err)
        })
    }
    render(){
        return(
            <div className='main-container'>
                <img className='bg-img' src='./mainbg.jpeg'/>
                <div className='signin'>
                <form onSubmit={this.handleSubmit}>
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
                    <p className='login-error'>
                        {this.state.error ? this.state.error : null}
                    </p>
                </form>
                </div>
            </div>
        )
    }
}

export default SignIn;