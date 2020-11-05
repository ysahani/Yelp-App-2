import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
        };
      }
    
    componentDidMount() {
        const data = {
            name: this.props.rname,
        }
        axios.post('http://localhost:3001/restaurant/getrecipients', data)
        .then((response) => {
            console.log('Status Code : ', response.status);
            if (response.status === 200) {
                this.setState({
                    res: response.data,
                  });
                  this.state.res.forEach((item) => {
                    console.log(item);
                  });
            } else {
            console.log('Post error in recipients!');
            }
        });
    }

    send = () => {
        const date = new Date();
        const dateVal = `${date.getUTCFullYear()}-${
          (`0${date.getUTCMonth() + 1}`).slice(-2)}-${
          (`0${date.getUTCDate()}`).slice(-2)} ${
          (`0${date.getUTCHours()}`).slice(-2)}:${
          (`0${date.getUTCMinutes()}`).slice(-2)}:${
          (`0${date.getUTCSeconds()}`).slice(-2)}`;
        const text = document.getElementById('messageTxt').value;
        console.log(text);
        document.getElementById('messageTxt').value = '';
        const data = {
            message: text,
            cname: this.props.cname,
            date_time: dateVal,
            rname: this.props.rname,
        };

        axios.post('http://localhost:3001/restaurant/sendmessage', data)
        .then((response) => {
            console.log('Status Code : ', response.status);
            if (response.status === 200) {
            console.log('Success!');
            } else {
            console.log('Post error in chatroom!');
            }
        });
        window.location.reload(true);
    }
    render() {
        const contents = this.state.res.map((item) => (
            <div style={{textAlign: 'center'}}>
                <Link>{item}</Link>
                <hr style={{backgroundColor: 'black'}}></hr>
            </div>
          ));
        return (
            <div>
                <div style={{ position: 'relative', height: '400px', width: '300px', border: 'solid', overflowY: 'scroll', borderColor: 'gray'}}>
                    {contents}
                </div>
                <div style={{ position: 'relative', bottom: '400px', left: '300px', height: '400px', width: '600px', border: 'solid', overflowY: 'scroll', borderColor: 'gray'}}>
                </div>
                <input id="messageTxt" style={{position: 'relative', bottom: '400px', width: '554px', left: '300px', backgroundColor: 'yellow'}}></input><button onClick={this.send} style={{position: 'relative', bottom: '400px', left: '300px'}}>Send</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cname: state.cName,
    rname: state.name,
  });
  
export default connect(mapStateToProps)(ChatRoom);