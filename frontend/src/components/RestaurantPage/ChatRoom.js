import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            msgs: [],
        };
      }
    
    componentDidMount() {
        const data = {
            rname: this.props.rname,
            name: this.props.cname,
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

        if(data.name !== undefined) {
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
        this.props.updateMsg(text);
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
        this.props.updateCname(e.currentTarget.textContent);
        const data = {
            rname: this.props.rname,
            name: e.currentTarget.textContent,
        };
        axios.post('http://localhost:3001/customer/getmessages', data)
        .then((response) => {
            console.log('Status Code : ', response.status);
            if (response.status === 200) {
                const data = [];
                // console.log(response.data);
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
                // data.forEach((item) => {
                //     console.log(item);
                // })
                this.setState({
                    msgs: data,
                  });
                  const {msgs} = this.state;
                  console.log(msgs);
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
          const messages = this.state.msgs.map((item) => (
            <div className={item.cname === undefined ? "speech-bubble" : "speech-bubblet"}>
                <p>{item.message}</p>
                <hr style={{backgroundColor: 'black'}}></hr>
            </div>
        ));
        return (
            <div>
                 <div id="header">
                <h1>{this.props.rname}</h1>
                <h2>{this.props.location}</h2>
                <hr id="line" />
                </div>
                <div id="events">
                <h4>
                    Messages
                </h4>
                <br/>
                </div>
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
    cname: state.cName,
    rname: state.name,
    location: state.location,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateCname: (cnam) => {
      dispatch({
        type: 'UPDATE_CNAME', cName: cnam,
      });
    },
    updateMsg: (msg) => {
        dispatch({
          type: 'UPDATE_MSG', message: msg,
        });
      },
  });

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);