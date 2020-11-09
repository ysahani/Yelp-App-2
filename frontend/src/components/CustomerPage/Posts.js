  
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {API_URL} from '../Utils';

function cancel (items, name) {
    console.log(items);
    const val = items;
    const data = {
      items: val,
      name: name,
    };
    axios.post(`${API_URL}/customer/cancelorder`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Post success in cancel order!');
          window.location.reload(true);
        } else {
          console.log('Post error in cancel order!');
        }
      });
  }

const Posts = ({ posts, loading, name }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4' style={{position: 'relative', left: '340px', width: '600px'}}>
      {posts.map(post => (
        <li className='list-group-item'>
          Items: {post.items} | Date Ordered: {post.real_datetime} | Order Status: {post.order_option} <br />
          <button id={post.items} type="submit" onClick={() => cancel(post.items, name)} style={{ backgroundColor: 'red', color: 'white' }}>Cancel Order</button>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
    rName: state.rName,
    name: state.name,
    city: state.city,
    state: state.state,
  });
  
  export default connect(mapStateToProps)(Posts);
