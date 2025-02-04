import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './CustomerPage.css';
import {API_URL} from '../Utils';

class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      pictures: [],
      url: '',
    };
    this.onDrop = this.onDrop.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
  }

  componentDidMount() {
    const data = {
      email: this.props.email,
    };
    axios.post(`${API_URL}/images/getcustomerurl`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            url: response.data,
          });
          const { url } = this.state;
          console.log('asdf');
          this.props.updateURL(response.data[0].url);
          console.log(`"${response.data[0].url}"`);
          console.log('Post success in customerurl!');
        } else {
          console.log('Post error in customerurl!');
        }
      });
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  uploadImages() {
    console.log(this.state.pictures);
    const uploadPromises = this.state.pictures.map((image) => {
      const data = new FormData();
      data.append('image', image, image.name);
      return axios.post(`${API_URL}/images/uploadImage`, data);
    });
    axios.all(uploadPromises)
      .then((results) => {
        console.log('server response: ');
        const url = JSON.stringify(results[0].data.downloadUrl);
        this.props.updateURL(results[0].data.downloadUrl);
        console.log(url);
      })
      .catch((e) => {
        console.log(e);
      });
    const data = {
      anEmail: this.props.email,
      url: this.props.url,
    };
    this.setState({
      url: this.props.url,
    });
    axios.post(`${API_URL}/images/customerurl`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Post success in customerurl!');
        } else {
          console.log('Post error in customerurl!');
        }
      });
  }

  search = (e) => {
    e.preventDefault();
    const data = {
      val: document.getElementById('searchh').value,
    };
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    axios.post(`${API_URL}/customer/customerpage`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            res: response.data,
          });
          const { res } = this.state;
          this.props.updateResults(res);
          this.props.history.push('/viewrestaurant');
          console.log('Post success in customer page!');
        } else {
          console.log('Post error in customer page!');
        }
      });
  }

  searchUser = (e) => {
    e.preventDefault();
    const data = {
      val: document.getElementById('userr').value,
    };
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    axios.post(`${API_URL}/customer/searchuser`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data.name);
          this.setState({
            res: response.data.name,
          });
          const { res } = this.state;
          this.props.updateResults(res);
          this.props.history.push('/viewuser');
          console.log('Post success in customer page!');
        } else {
          console.log('Post error in customer page!');
        }
      });
  }

  render() {
    const url = this.props.url;
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <input placeholder="Search for Food.." id="searchh" />
          <button type="submit" onClick={this.search}>Search</button>
          <label>
             <select id="persona">
               <option value="Curbside Pick Up">Curbside Pick Up</option>
               <option value="Dine in">Dine In</option>
               <option value="Yelp Delivery">Yelp Delivery</option>
               <option value="Location">Location</option>
             </select>
           </label>
           <input style={{marginLeft: '20px'}} placeholder="Search for User.." id="userr" />
          <button type="submit" onClick={this.searchUser}>Search</button>
        </div>
        <div id="header">
          <h1>{this.props.name}</h1>
          <h2>
            {this.props.city}
            ,
            {' '}
            {this.props.state}
          </h2>
          <hr id="line" />
        </div>
        <div>
          <ul style={{ listStyle: 'none' }}>
            <li id="update"><Link to="/updatecustomer">Update Your Page</Link></li>
          </ul>
        </div>
        <div>
          <br />
          <h4 className="aTitle">About</h4>
          <p className="details">
            Yelping Since:
            {' '}
            {this.props.yelpingSince}
          </p>
          <p className="details">
            Things I love:
            {' '}
            {this.props.thingsILove}
          </p>
          <p className="details">
            Find Me In:
            {' '}
            {this.props.findMeIn}
          </p>
          <p className="details">
            My Blog/Website:
            {' '}
            {this.props.blogsite}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Basic Details</h4>
          <p className="details">
            Name:
            {' '}
            {this.props.name}
          </p>
          <p className="details">
            City:
            {' '}
            {this.props.city}
          </p>
          <p className="details">
            State:
            {' '}
            {this.props.state}
          </p>
          <p className="details">
            Country:
            {' '}
            {this.props.country}
          </p>
          <p className="details">
            Nick Name:
            {' '}
            {this.props.nickname}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Contact Information</h4>
          <p className="details">
            Email ID:
            {' '}
            {this.props.email}
          </p>
          <p className="details">
            Phone Number:
            {' '}
            {this.props.phone}
          </p>
        </div>
        <img style={{position: 'relative', bottom: '500px', left: '20px'}} src={url} alt="" />
        <ImageUploader
          withPreview
          withIcon
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={5242880}
          style={{position: 'relative', bottom: '500px', right: '80px', width: '400px' }}
        />
        <button style={{ position: 'relative', bottom: '500px', left: '60px' }} onClick={this.uploadImages} type="submit">Upload Image</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
  yelpingSince: state.yelpingSince,
  thingsILove: state.thingsILove,
  findMeIn: state.findMeIn,
  blogsite: state.blogsite,
  dob: state.dob,
  city: state.city,
  state: state.state,
  country: state.country,
  nickname: state.nickname,
  phone: state.phone,
  url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
  updateResults: (results) => {
    dispatch({
      type: 'UPDATE_RESULTS', sResults: results,
    });
  },
  updateURL: (url) => {
    dispatch({
      type: 'UPDATE_URL', aurl: url,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);
