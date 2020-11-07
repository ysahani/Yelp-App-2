  
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Revs = ({ revs, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const contents = revs.map((item) => (
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
  return (
      <div>
           <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          {contents}
      </div>
  );
};

const mapStateToProps = (state) => ({
    rName: state.rName,
    name: state.name,
    city: state.city,
    state: state.state,
  });
  
  export default connect(mapStateToProps)(Revs);
