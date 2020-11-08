  
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { connect } from 'react-redux';

const Orderz = ({ fx, fx2, orders, loading }) => {
    function clickLink (name) {
        fx(name);
      }
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const contents = orders.map((item) => (
    <tr>
      <td>
        <Link to="/viewcustomer" onClick={() => clickLink(item.cName)}>{item.cName}</Link>
      </td>
      <td>
        {item.real_datetime}
      </td>
      <td>
        {item.items}
      </td>
      <td id={item.items}>
        {fx2(item.delivery_option, item.items, item.order_option)}
      </td>
    </tr>
  ));
  return (
      <div>
          {contents}
      </div>
  );
};

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Orderz);
  