import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Yelp from '../../download.png';
import {API_URL} from '../Utils';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      persona: 'customer',
      restaurantName: '',
      customerName: '',
      location: '',
      // err: true,
    };
  }

  handleChange = (e) => {
    this.setState({
      persona: e.target.value,
    });
  }

  emailChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  passwordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  restaurantNameChange = (e) => {
    this.setState({
      restaurantName: e.target.value,
    });
  }

  locationChange = (e) => {
    this.setState({
      location: e.target.value,
    });
  }

  customerNameChange = (e) => {
    this.setState({
      customerName: e.target.value,
    });
  }

     // submit Login handler to send a request to the node backend
     submitLogin = (e) => {
       // const headers = new Headers();
       // prevent page from refresh
       e.preventDefault();

       const { username } = this.state;
       const { password } = this.state;
       const { persona } = this.state;
       const { location } = this.state;
       const { restaurantName } = this.state;
       const { customerName } = this.state;

       const data = {
         user: username,
         pass: password,
         pers: persona,
         loc: location,
         rname: restaurantName,
         cname: customerName,
       };
       // set the with credentials to true
       axios.defaults.withCredentials = true;
       // make a post request with the user data
       axios.post(`${API_URL}/user/signup`, data)
         .then((response) => {
           console.log('Status Code : ', response.status);
           if (response.status === 200) {
             this.props.signUserUp();
             this.props.history.push('/login');
           } else {
             this.props.dontSignUserUp();
           }
         });
     }

     render() {
       console.log(this.state.persona);
       // const { isSignedUp } = this.props;
       console.log(this.props.isSignedUp);
       // const { err } = this.state;
       let errButton;
       if (this.props.isSignedUp === false) {
         errButton = <p style={{ color: 'red', textAlign: 'center' }}>Username Already Registered!</p>;
       } else if (this.props.isSignedUp === true) {
         errButton = null;
       }
       const { persona } = this.state;
       let showForm;
       if (persona === 'customer') {
         showForm = (
           <div style={{ textAlign: 'center' }}>
             <br />
             <label htmlFor="name">
               <input placeholder="Name" type="text" id="name" name="name" onChange={this.customerNameChange} />
             </label>
             <br />
             <label htmlFor="email">
               <input placeholder="Email" type="text" id="email" name="email" onChange={this.emailChange} />
             </label>
             <br />
             <label htmlFor="password">
               <input placeholder="Password" type="password" id="password" name="password" onChange={this.passwordChange} />
             </label>
             <br />
             <br />
           </div>
         );
       } else if (persona === 'restaurant') {
         showForm = (
           <div>
             <br />
             <label htmlFor="name">
               <input placeholder="Restaurant Name" type="text" id="name" name="name" onChange={this.restaurantNameChange} />
             </label>
             <br />
             <label htmlFor="email">
               <input placeholder="Email" type="text" id="email" name="email" onChange={this.emailChange} />
             </label>
             <br />
             <label htmlFor="password">
               <input placeholder="Password" type="password" id="password" name="password" onChange={this.passwordChange} />
             </label>
             <br />
             <label htmlFor="location">
               <input placeholder="Location" type="text" id="location" name="location" onChange={this.locationChange} />
             </label>
             <br />
             <br />
           </div>
         );
       }
       return (
         <div style={{ textAlign: 'center' }}>
           <img src={Yelp} alt="" style={{ width: '100px' }} />
           <h2 style={{ color: '#d32323' }}>Sign Up for Yelp</h2>
           <br />
           <label htmlFor="persona">
             Choose a Persona:
             <select id="persona" onChange={this.handleChange} value={persona}>
               <option value="customer">Customer</option>
               <option value="restaurant">Restaurant</option>
             </select>
           </label>
           {showForm}
           <button onClick={this.submitLogin} type="submit">Sign Up</button>
           {errButton}
         </div>
       );
     }
}

const mapStateToProps = (state) => ({
  isSignedUp: state.isSignedUp,
});

const mapDispatchToProps = (dispatch) => ({
  signUserUp: () => { dispatch({ type: 'SIGNUP_USER' }); },
  dontSignUserUp: () => { dispatch({ type: 'DONT_SIGNUP_USER' }); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
