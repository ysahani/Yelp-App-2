  
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Dishes = ({ fx, dishes, loading }) => {
    function clickLink (name) {
       fx(name);
      }
    const contents = dishes.map((item) => (
        <tr>
          <td>
            <Link to="/editdish" onClick={() => clickLink(item.dish_name)}>{item.dish_name}</Link>
          </td>
          <td>
            {item.ingredients}
          </td>
          <td>
            {item.price}
          </td>
          <td>
            {item.category}
          </td>
          <td>
            {item.description}
          </td>
          <td>
            <img src={item.url} alt="" style={{ width: '80px', height: '100px' }} />
          </td>
        </tr>
      ));
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
         <tr>
              <th>Dish name</th>
              <th>Ingredients</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Picture</th>
            </tr>
        {contents}
    </div>
  );
};

const mapStateToProps = (state) => ({
    rname: state.name,
    location: state.location,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateDishName: (dnam) => {
      dispatch({
        type: 'UPDATE_DNAME', dName: dnam,
      });
    },
  });
  export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
