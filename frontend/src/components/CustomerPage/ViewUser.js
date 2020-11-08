import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          results: this.props.results,
        };
      }
    render() {
        const { results } = this.state;
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
                    Search Results
                </h4>
                <br />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link to="viewcust">{results}</Link>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);
