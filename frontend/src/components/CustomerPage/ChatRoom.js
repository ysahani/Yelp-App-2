import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../CustomerPage/ChatRoom.css';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            rname: '',
            msgs: [],
        };
      }
    
    componentDidMount() {
        const data = {
            name: this.props.name,
            rname: this.props.rname,
        }
        axios.post('http://localhost:3001/customer/getrecipients', data)
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

        if(data.rname !== undefined) {
        axios.post('http://localhost:3001/customer/getmessages', data)
        .then((response) => {
            console.log('Status Code : ', response.status);
            if (response.status === 200) {
                const data = [];
                // this.setState({
                //     msgs: response.data.message,
                //   });
                //   response.data.forEach((item) => {
                //     console.log(item);
                //   });
                console.log(response.data.length);
                for(let i = 0; i < response.data.length; i++) {
                    // console.log(response.data[i]);
                    let obj = {message: response.data[i].message, cname: response.data[i].cname}
                    // data.push(response.data[i].message);
                    data.push(obj);
                }
                data.forEach((item) => {
                    console.log(item);
                })
                this.setState({
                    msgs: data,
                  });
            } else {
            console.log('Post error in recipients!');
            }
        });
    }
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
        const { rname } = this.state;
        const data = {
            message: text,
            date_time: dateVal,
            r_name: this.props.rname,
            name: this.props.name,
        };

        axios.post('http://localhost:3001/customer/sendmessage', data)
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

    click = (e) => {
        e.preventDefault();
        // this.setState({
        //     rname: e.currentTarget.textContent,
        // });
        // const { rname } = this.state;
        // console.log(rname);
        // const data = {
        //     name: this.props.name,
        //     rname: this.state.rname,
        // };
        this.props.updateRname(e.currentTarget.textContent);
        const data = {
            name: this.props.name,
            rname: e.currentTarget.textContent,
        };
        axios.post('http://localhost:3001/customer/getmessages', data)
        .then((response) => {
            console.log('Status Code : ', response.status);
            if (response.status === 200) {
                const data = [];
                // this.setState({
                //     msgs: response.data.message,
                //   });
                //   response.data.forEach((item) => {
                //     console.log(item);
                //   });
                console.log(response.data.length);
                for(let i = 0; i < response.data.length; i++) {
                    // console.log(response.data[i]);
                    let obj = {message: response.data[i].message, cname: response.data[i].cname}
                    // data.push(response.data[i].message);
                    data.push(obj);
                }
                data.forEach((item) => {
                    console.log(item);
                })
                this.setState({
                    msgs: data,
                  });
            } else {
            console.log('Post error in recipients!');
            }
        });
    }

    render() {
        const contents = this.state.res.map((item) => (
            <div style={{textAlign: 'center'}}>
                <Link onClick={this.click}>{item}</Link>
                <hr style={{backgroundColor: 'black'}}></hr>
            </div>
          ));
        
          const { msgs } = this.state;
          const messages = msgs.map((item) => (
            <div className={item.cname === undefined ? "speech-bubble" : "speech-bubblet"}>
                <p>{item.message}</p>
                <hr style={{backgroundColor: 'black'}}></hr>
            </div>
        ));
        return (
            <div>
                <div style={{ position: 'relative', height: '400px', width: '300px', border: 'solid', overflowY: 'scroll', borderColor: 'gray'}}>
                    {contents}
                </div>
                <div style={{ position: 'relative', bottom: '400px', left: '300px', height: '400px', width: '600px', border: 'solid', overflowY: 'scroll', borderColor: 'gray'}}>
                    {messages}
                </div>
                <input id="messageTxt" style={{position: 'relative', bottom: '400px', width: '554px', left: '300px', backgroundColor: 'yellow'}}></input><button onClick={this.send} style={{position: 'relative', bottom: '400px', left: '300px'}}>Send</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    name: state.name,
    rname: state.rName,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateRname: (name) => {
      dispatch({
        type: 'UPDATE_RNAME', rName: name,
      });
    },
  });
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);