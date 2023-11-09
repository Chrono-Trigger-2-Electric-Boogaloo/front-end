import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        password1: "",
        password2: "",
      },
      errors: {
          password1: [],
          username: []
      },
    };
  }

  addUser = (e) => {
    e.preventDefault();
    if (this.state.credentials.password1 === this.state.credentials.password2){
        axios.post(`${process.env.REACT_APP_BACKEND_URL}api/registration/ `, this.state.credentials)
        .then(res => {
          setTimeout(1000)
          this.loginUser()
        })
        .catch (e => {
          console.log(e)
        })

    } else{
        this.setState({
            ...this.state,
            errors: {
                ...this.state.error,
                password1: ['Passwords do not match']
            }
        })
    //    this.setState({
    //        ...this.state,
    //        error: ['Passwords do not match']
    //    })
    }
  };

  loginUser = () => {
    let loginCredentials = {
      username: this.state.credentials.username,
      password: this.state.credentials.password1,
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}api/login/`, loginCredentials)
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

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });

  };
  render() {
    return (
      <div className="main-container">
        <img className="bg-img" src="./mainbg.jpeg" />
        <div className="signup">
          <form onSubmit={this.addUser}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
              required
            />
   <p className='err-display'>
           {this.state.errors.username && this.state.errors.username[0]}
            </p>
            <input
              name="password1"
              type="password"
              placeholder="Password"
              value={this.state.credentials.password1}
              onChange={this.handleChange}
              required
            />
            <input
              name="password2"
              type="password"
              placeholder="Confirm Password"
              value={this.state.credentials.password2}
              onChange={this.handleChange}
              required
            />
             <p className='err-display'>
           {this.state.errors.password1 && this.state.errors.password1[0]}
            </p>
            <button>Sign Up!</button>
           
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
