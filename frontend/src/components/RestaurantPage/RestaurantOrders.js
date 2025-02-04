import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Orderz from './Orderz';
import Pagination from '../CustomerPage/Pagination';
import {API_URL} from '../Utils';

class RestaurantOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      res: [],
      option: '',
      loading: true,
      currentPage: 1,
      postPerPage: 5,
    };
  }

  componentDidMount() {
    const { name } = this.state;
    const data = {
      rName: name,
    };

    this.setState({
      loading: true,
    });
    axios.post(`${API_URL}/restaurant/restaurantorders`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
        console.log(response.data);
          this.setState({
            res: response.data,
          });
          this.state.res.forEach((item) => {
            console.log(item.name);
          });
          this.setState({
            loading: false,
          });
        } else {
          console.log('Post error in restaurant orders!');
        }
      });
  }

  handleChange = (e) => {
    e.preventDefault();
    const val = e.currentTarget.value;
    const item = e.currentTarget.id;
    // console.log(val);
    // console.log(item);
    this.setState({
      option: val,
    });
    const { option } = this.state;
    console.log(val);
    const data = {
      order_option: val,
      items: item,
    };
    axios.post(`${API_URL}/restaurant/updateorder`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Post success in restaurant orders!');
        } else {
          console.log('Post error in restaurant orders!');
        }
      });
  }

  clickLin = (e) => {
    this.props.updateCname(e.currentTarget.textContent);
  }

  handleFilter = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const val = e.currentTarget.value;
    console.log(val);
    const data = {
      rName: name,
      filter: val,
    };
    axios.post(`${API_URL}/restaurant/filterorder`, data)
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
    const showItems = (aption, name, option) => {
      this.props.updateFilter('Preparing',name);
      if (aption === 'Delivery' && option === 'Order Recieved') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved" selected>Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      } if (aption === 'Delivery' && option === 'Preparing') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing" selected>Preparing</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      } if (aption === 'Delivery' && option === 'On the Way') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="On the Way" selected>On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      } if (aption === 'Delivery' && option === 'Delivered') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered" selected>Delivered</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Order Recieved') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Preparing') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing" selected>Preparing</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Pick Up Ready') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="Pick Up Ready" selected>Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Picked Up') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up" selected>Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Cancel') {
        return (
          <p>Cancelled</p>
        );
      } if (aption === 'Delivery' && option === 'Cancel') {
        return (
          <p>Cancelled</p>
        );
      }
    };
    const { res } = this.state;
    const { loading } = this.state;

    const paginate = pageNumber => this.setState({ currentPage: pageNumber });
    const { postPerPage } = this.state;
    const { currentPage } = this.state;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = res.slice(indexOfFirstPost, indexOfLastPost);

    const contents = this.state.res.map((item) => (
      <tr>
        <td>
          <Link to="/viewcustomer" onClick={this.clickLin}>{item.cName}</Link>
        </td>
        <td>
          {item.real_datetime}
        </td>
        <td>
          {item.items}
        </td>
        <td id={item.items}>
          {showItems(item.delivery_option, item.items, item.order_option)}
        </td>
      </tr>
    ));
    return (
      <div>
        <div id="header">
          <h1>{this.props.name}</h1>
          <h2>{this.props.location}</h2>
          <hr id="line" />
        </div>
        <div id="events">
          <h4>
            Orders
          </h4>
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>
          <label htmlFor="filterorders">
            Filter Orders:
            <select onChange={this.handleFilter}>
              <option value="All Orders">All Orders</option>
              <option value="New Orders">New Orders</option>
              <option value="Delivered Orders">Delivered Orders</option>
              <option value="Cancelled Orders">Cancelled Orders</option>
            </select>
          </label>
          <table style={{ position: 'relative', left: '450px' }}>
            <Orderz fx={this.props.updateCname} fx2={showItems} orders={currentPosts} loading={loading}></Orderz>
          </table>
          <Pagination
            postsPerPage={postPerPage}
            totalPosts={res.length}
            paginate={paginate}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  location: state.location,
});

const mapDispatchToProps = (dispatch) => ({
  updateCname: (cnam) => {
    dispatch({
      type: 'UPDATE_CNAME', cName: cnam,
    });
  },
  updateFilter: (stat, item) => {
    dispatch({
      type: 'UPDATE_FILTER', status: stat, items: item,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantOrders);
