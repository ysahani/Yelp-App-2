import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {API_URL} from '../Utils';

class RestaurantTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rName: this.props.rName,
      res: [],
      orderArr: [],
      option: 'Delivery',
    };
  }

  componentDidMount() {
    const { rName } = this.state;
    const data = {
      rname: rName,
    };
    axios.defaults.headers.common.authorization = localStorage.getItem('token');
    axios.post(`${API_URL}/restaurant/menu`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data[0].menu);
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
  }

  click = (e) => {
    e.preventDefault();
    const arr = [...this.state.orderArr];
    arr.push(e.currentTarget.id);
    this.setState({ orderArr: arr });
    // console.log(this.state.orderArr);
  }

  order = (e) => {
    e.preventDefault();
    const { option } = this.state;
    const arr = [...this.state.orderArr];
    const fullOrder = arr.join(',');
    this.props.updateOrder(fullOrder, option);
    const date = new Date();
    const dateVal = `${date.getUTCFullYear()}-${
      (`0${date.getUTCMonth() + 1}`).slice(-2)}-${
      (`0${date.getUTCDate()}`).slice(-2)} ${
      (`0${date.getUTCHours()}`).slice(-2)}:${
      (`0${date.getUTCMinutes()}`).slice(-2)}:${
      (`0${date.getUTCSeconds()}`).slice(-2)}`;
    
    const datetime = `${date.getUTCMonth()}/${date.getUTCDay()}/${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;

    const data = {
      items: fullOrder,
      cName: this.props.name,
      rName: this.props.rName,
      date_time: dateVal,
      delivery_option: option,
      real_datetime: datetime,
    };

    axios.post(`${API_URL}/customer/placeorder`, data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // console.log(response.data);
          this.props.history.push('/customerorders');
        } else {
          console.log('Post error in placeorder!');
        }
      });
  }

  handleChange = (e) => {
    this.setState({
      option: e.target.value,
    });
  }

  render() {
    const { option } = this.state;
    const { orderArr } = this.state;
    const order = orderArr.join(',');
    const contents = this.state.res.map((item) => (
      <div>
        <p>
          {item.dish_name}
          /
          {item.price}
        </p>
        <button type="submit" id={item.dish_name} onClick={this.click}>Add to Cart</button>
      </div>
    ));
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
            Place Order
          </h4>
          <br />
        </div>
        <div style={{ position: 'relative', left: '400px' }}>
          {contents}
        </div>
        <div style={{ position: 'relative', left: '770px', bottom: '450px' }}>
          <p>
            Your Order:
            {' '}
            {order}
          </p>
          <select id="option" onChange={this.handleChange} value={option}>
            <option value="Delivery">Delivery</option>
            <option value="Pickup">Pickup</option>
          </select>
          <button type="submit" onClick={this.order} style={{ backgroundColor: '#d32323', color: 'white', marginLeft:'1px' }}>Complete Order</button>
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

const mapDispatchToProps = (dispatch) => ({
  updateOrder: (items, choice) => {
    dispatch({
      type: 'UPDATE_ORDER', orderItems: items, delivery: choice,
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantTab);
