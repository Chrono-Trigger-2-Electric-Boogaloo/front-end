import React from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

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
        username: [],
      },
      loading: false,
    };
  }

  addUser = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      loading: true,
    });
    if (this.state.credentials.password1 === this.state.credentials.password2) {
      axios
        .post(
          "https://chronotrigger-remake.herokuapp.com/api/registration/ ",
          this.state.credentials
        )
        .then((res) => {
          localStorage.setItem("token", res.data.key);
          this.setState({
            ...this.state,
            loading: false,
          });
          this.props.history.push("/play");
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            errors: err.response.data,
            loading: false,
          });
        });
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.error,
          password1: ["Passwords do not match"],
        },
        loading: false,
      });
    }
  };

  createGuest = (e) => {
    const randomNum = Math.ceil(Math.random() * 10000000000)
    const guestCreds = {
      username: randomNum,
      password1: `${randomNum}abc`,
      password2: `${randomNum}abc`
    }
    this.setState({
      ...this.state,
      credentials : guestCreds
    }, 
    this.addUser.bind(this, e)
    )
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
          {this.state.loading ? (
            <div className="loading">
              <span>Loading</span>
              <Loader type="ThreeDots" color="white" height={50} width={50} />
            </div>
          ) : (
            <form onSubmit={this.addUser}>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.credentials.username}
                onChange={this.handleChange}
                required
              />
              <p className="err-display">
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
              <p className="err-display">
                {this.state.errors.password1 && this.state.errors.password1[0]}
              </p>
              <button onClick={this.addUser}>Sign Up!</button>
              <button onClick={(e)=>this.createGuest(e)}>Continue as Guest</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default SignUp;
