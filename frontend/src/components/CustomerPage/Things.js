  
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { connect } from 'react-redux';

const Things = ({ fx, things, loading }) => {
    const history = useHistory();
    function clickLink (name, description, time, date, location, hashtags) {
        // const history = useHistory();
        // e.preventDefault();
        console.log(name);
        fx(name, description, time, date, location, hashtags);
      }
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const contents = things.map((item) => (
    <tr>
      <td>
        <Link to="/registerevent" onClick={() => clickLink(item.name, item.description, item.time, item.date.substring(0, 10), item.location, item.hashtags)}>{item.name}</Link>
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
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateEvent: (name, desc, time, date, loc, htags) => {
      dispatch({
        type: 'UPDATE_EVENT', eventName: name, eventDesc: desc, eventTime: time, eventDate: date, eventLoc: loc, eventHtags: htags,
      });
    },
  });
  export default connect(mapStateToProps, mapDispatchToProps)(Things);
