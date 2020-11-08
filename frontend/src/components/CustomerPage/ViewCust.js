import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class ViewCust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.results,
            res: [],
        };
      }
    componentDidMount() {
        const { results } = this.state;
        let data = {
            cname: results,
          };
        axios.post('http://localhost:3001/restaurant/viewcustomer', data)
        .then((response) => {
            console.log('Status Code : ', response.status);
            if (response.status === 200) {
                console.log(response.data);
            this.setState({
                res: response.data[0],
            });
            console.log(this.state.res);
            } else {
            console.log('Post error in restaurant events!');
            }
        });
    }

    follow = () => {
        const { results } = this.state;
        let data = {
            name: this.props.name,
            cname: results,
          };
        axios.post('http://localhost:3001/customer/followuser', data)
        .then((response) => {
            console.log('Status Code : ', response.status);
            if (response.status === 200) {
            console.log('Post success in follow user!');
            // window.location.reload(true);
            } else {
            console.log('Post error in follow user!');
            }
        });
    }
    render() {
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
                    <button style={{ position: 'relative', left: '845px', top: '35px', backgroundColor: '#d32323', color: 'white'}} onClick={this.follow}>Follow</button>
                    <div style={{ marginTop: '-20px'}}>
                    <br />
                    <h4 className="aTitle">About</h4>
                    <p className="details">
                        Yelping Since:
                        {' '}
                        { res.yelpingSince }
                    </p>
                    <p className="details">
                        Things I love:
                        {' '}
                        {res.thingsILove}
                    </p>
                    <p className="details">
                        Find Me In:
                        {' '}
                        {res.findMeIn}
                    </p>
                    <p className="details">
                        My Blog/Website:
                        {' '}
                        {res.blogsite}
                    </p>
                    <hr className="aLine" />
                    <h4 className="aTitle">Basic Details</h4>
                    <p className="details">
                        Name:
                        {' '}
                        {res.name}
                    </p>
                    <p className="details">
                        City:
                        {' '}
                        {res.city}
                    </p>
                    <p className="details">
                        State:
                        {' '}
                        {res.state}
                    </p>
                    <p className="details">
                        Country:
                        {' '}
                        {res.country}
                    </p>
                    <p className="details">
                        Nick Name:
                        {' '}
                        {res.nickname}
                    </p>
                    <hr className="aLine" />
                    <h4 className="aTitle">Contact Information</h4>
                    <p className="details">
                        Email ID:
                        {' '}
                        {res.email}
                    </p>
                    <p className="details">
                        Phone Number:
                        {' '}
                        {res.phone}
                    </p>
                    </div>
                    <img
                        src="https://yelppictures.s3-us-west-1.amazonaws.com/85b29161-0328-4f97-ab30-84cb0af962a6"
                        alt=""
                        style={{
                            position: 'relative', bottom: '470px', left: '20px', border: 'solid',
                        }}
        />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    results: state.results,
    name: state.name,
    city: state.city,
    state: state.state,
  });

  const mapDispatchToProps = (dispatch) => ({
    updateRname: (name) => {
      dispatch({
        type: 'UPDATE_RNAME', rName: name,
      });
    },
  });
export default connect(mapStateToProps, mapDispatchToProps)(ViewCust);
