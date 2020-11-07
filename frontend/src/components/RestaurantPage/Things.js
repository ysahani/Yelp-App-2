  
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { connect } from 'react-redux';

const Things = ({ fx, things, loading }) => {
    const history = useHistory();
    function clickLink (name) {
        // const history = useHistory();
        // e.preventDefault();
        console.log(name);
        fx(name);
        history.push('/registeredlist');
      }
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const contents = things.map((item) => (
    <tr>
      <td>
        <Link onClick={() => clickLink(item.name)}>{item.name}</Link>
        <br />
        {item.description}
        <br />
        {item.time}
        <br />
        {item.date.substring(0, 10)}
        <br />
        {item.location}
        <br />
        {item.hashtags}
        <br />
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
    rname: state.name,
    location: state.location,
    email: state.email,
    timings: state.timings,
    description: state.description,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateViewvent: (eName) => {
      dispatch({
        type: 'UPDATE_VIEWVENT', eventName: eName,
      });
    },
  });
  export default connect(mapStateToProps, mapDispatchToProps)(Things);
