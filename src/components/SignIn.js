import React from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

class SignIn extends React.Component {
    constructor(props){
        super(props)

    this.state={ 
        credentials:{
            username: '',
            password: ''
        },
        error: '',
        loading: false
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
        this.setState({
            ...this.state,
            loading: true
        })
        axios.post('https://chronotrigger-remake.herokuapp.com/api/login/', this.state.credentials)
        .then(res => {
           localStorage.setItem('token', res.data.key)
           this.setState({
               ...this.state,
               loading: false
            })
            this.props.history.push('/play');
        })
        .catch(err => {
            this.setState({
                ...this.state,
                error: 'Incorrect email or password',
                loading: false
            })
        })
    }
    render(){
        return(
            <div className='main-container'>
                <img className='bg-img' src='./mainbg.jpeg'/>
                <div className='signin'>
                    {this.state.loading ? 
                          <div className='loading'>
                          <span >Loading</span>
                              <Loader
                              type="ThreeDots"
                              color="white"
                              height={50}
                              width={50}
                           />
                           </div>: 
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
    }
                </div>
            </div>
        )
    }
}

export default SignIn;