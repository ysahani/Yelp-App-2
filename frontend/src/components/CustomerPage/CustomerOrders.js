import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Posts from './Posts';
import Pagination from './Pagination';
import {API_URL} from '../Utils';

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      res: [],
      loading: true,
      currentPage: 1,
      postPerPage: 5,
    };
  }

  componentDidMount() {
    const { name } = this.state;
    const data = {
      cName: name,
    };
    this.setState({
      loading: true,
    });
    axios.post(`${API_URL}/customer/customerorders`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // console.log(response.data);
          this.setState({
            res: response.data,
          });
          this.state.res.forEach((item) => {
            console.log(item.name);
          });
        } else {
          console.log('Post error in restaurant events!');
        }
      });
      this.setState({
        loading: false,
      });
  }

  cancel = (e) => {
    console.log(e.currentTarget.id);
    const val = e.currentTarget.id;
    const data = {
      items: val,
      name: this.props.name,
    };
    axios.post(`${API_URL}/customer/cancelorder`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Post success in cancel order!');
        } else {
          console.log('Post error in cancel order!');
        }
      });
  }

  handleFilter = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const val = e.currentTarget.value;
    console.log(val);
    const data = {
      cName: name,
      filter: val,
    };
    axios.post(`${API_URL}/filtcustomerorder`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            res: response.data,
          });
          console.log('Post success in restaurant orders!');
        } else {
          console.log('Post error in restaurant orders!');
        }
      });
  }
  render() {
    // const contents = this.state.res.map((item) => (
    //   <tr>
    //     <td>
    //       {item.items}
    //     </td>
    //     <td>
    //       {item.real_datetime}
    //     </td>
    //     <td>
    //       {item.order_option}
    //     </td>
    //     <td>
    //       <button id={item.items} type="submit" onClick={this.cancel} style={{ backgroundColor: 'red' }}>Cancel Order</button>
    //     </td>
    //   </tr>
    // ));
    const contents = this.state.res.map((item) => (
      <li className='list-group-item' style={{width: '800px'}}>
        <p style={{color:'black'}}>Items: {item.items} | Date Ordered: {item.real_datetime} | Order Status: {item.order_option}</p>
        <button id={item.items} type="submit" onClick={this.cancel} style={{ backgroundColor: 'red' }}>Cancel Order</button>
        </li>
    ));
    // const { postPerPage } = this.state;
    // const { currentPage } = this.state;
    // const { loading } = this.state;
    // const { res } = this.state;
    // const indexOfLastPost = currentPage * postPerPage;
    // const indexOfFirstPost = indexOfLastPost - postPerPage;
    // const currentPosts = res.slice(indexOfFirstPost, indexOfLastPost);
    // const Posts = ({ posts, loading }) => {
    //   if (loading) {
    //     return <h2>Loading...</h2>;
    //   }
    
    //   return (
    //     <ul className='list-group mb-4'>
    //       {posts.map(post => (
    //         <li key={post.id} className='list-group-item'>
    //           {post.title}
    //         </li>
    //       ))}
    //     </ul>
    //   );
    // };
   
    const paginate = pageNumber => this.setState({ currentPage: pageNumber });
    const { postPerPage } = this.state;
    const { currentPage } = this.state;
    const { loading } = this.state;
    const { res } = this.state;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = res.slice(indexOfFirstPost, indexOfLastPost);
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
          <h4>
            View Orders
          </h4>
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>
          <label htmlFor="filterorders">
            Filter Orders:
            <select onChange={this.handleFilter}>
              <option value="Order Recieved">Order Recieved</option>
              <option value="Preparing">Preparing</option>
              <option value="On the Way">On the Way</option>
              <option value="Delivered">Delivered</option>
              <option value="Pick Up Ready">Pick Up Ready</option>
              <option value="Picked Up">Picked Up</option>
            </select>
          </label>
          <div>
          <Posts posts={currentPosts} loading={loading}></Posts>
          <Pagination
            postsPerPage={postPerPage}
            totalPosts={res.length}
            paginate={paginate}
            name={this.props.name}
          />
          </div>
        </div>
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

export default connect(mapStateToProps)(CustomerOrders);
