import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Revs from './Revs';
import Pagination from './Pagination';
import {API_URL} from '../Utils';

class RestaurantProf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: '',
      revs: [],
      rName: this.props.rName,
      loading: true,
      currentPage: 1,
      postPerPage: 5,
    };
  }

  componentDidMount() {
    const { rName } = this.state;
    const data = {
      name: rName,
    };
    axios.post(`${API_URL}/customer/restaurantprof`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            res: response.data[0],
          });
          const { res } = this.state;
          console.log(res);
          console.log('Post success in restaurantprof page!');
        } else {
          console.log('Post error in restaurantprof page!');
        }
      });

      this.setState({
        loading: true,
      });
    axios.post(`${API_URL}/customer/rprofreviews`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            revs: response.data,
          });
          const { revs } = this.state;
          console.log(revs);
          console.log('Post success in rprofreviews page!');
        } else {
          console.log('Post error in rprofreviews page!');
        }
      });
      this.setState({
        loading: false,
      });
  }

  order = () => {
    this.props.history.push('/restauranttab');
  }

  review = () => {
    this.props.history.push('/makereview');
  }

  render() {
    const paginate = pageNumber => this.setState({ currentPage: pageNumber });
    const { postPerPage } = this.state;
    const { currentPage } = this.state;
    const { loading } = this.state;
    const { revs } = this.state;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = revs.slice(indexOfFirstPost, indexOfLastPost);
    const contents = this.state.revs.map((item) => (
      <tr>
        <td>
          {item.customer_name}
        </td>
        <td>
          {item.date.substring(0, 10)}
        </td>
        <td>
          {item.rating}
        </td>
        <td>
          {item.comments}
        </td>
      </tr>
    ));
    const { res } = this.state;

    return (
      <div>
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
        <div id="events">
          <br />
          <h4>
            About
          </h4>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h5 className="subtitle">
            <b>Restaurant Name</b>
            <p>{res.name}</p>
          </h5>
          <h5 className="subtitle">
            <b>Location</b>
            <p>{res.location}</p>
          </h5>
          <h5 className="subtitle">
            <b>Description</b>
            <p>{res.description}</p>
          </h5>
          <h5 className="subtitle">
            <b>Contact Information</b>
            <p>{res.email}</p>
          </h5>
          <h5 className="subtitle">
            <b>Timings</b>
            <p>{res.timings}</p>
          </h5>
        </div>
        <hr id="line" />
        <div id="events">
          <h4>
            Reviews
          </h4>
        </div>
        <div style={{ textAlign: 'center' }}>
          <table  style={{
            backgroundColor: '#D2691E', color: 'white', position: 'relative', left: '500px',
          }}>
          <Revs revs={currentPosts} loading={loading}></Revs>
          </table>
          <Pagination
            postsPerPage={postPerPage}
            totalPosts={revs.length}
            paginate={paginate}
          />
        </div>
        <br />
        <br />
        <div style={{ textAlign: 'center' }}>
          <b style={{ marginRight: '60px' }}>Place an Order!</b>
          <b style={{ marginLeft: '-20px' }}>Make a review!</b>
          <br />
          <button type="submit" onClick={this.order}>Order Now</button>
          <button type="submit" onClick={this.review} style={{ marginLeft: '50px' }}>Place a Review</button>
        </div>
        <img
          style={{
            position: 'relative', bottom: '440px', right: '-20px', width: '300px', height: '200px', border: 'solid',
          }}
          src="https://yelppictures.s3-us-west-1.amazonaws.com/SAJJ_San_Francisco1.jpg"
          alt=""
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rName: state.rName,
  name: state.name,
  city: state.city,
  state: state.state,
});
export default connect(mapStateToProps)(RestaurantProf);
