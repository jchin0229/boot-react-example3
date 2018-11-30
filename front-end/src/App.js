import React, { Component } from 'react';
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
//import logo from './logo.svg';
import './App.css';

// Redux:
const ADD = 'ADD';
const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = createStore(messageReducer);

class Presentational extends Component {

    constructor(props) {
      super(props);

      this.state = {
        input: '',
        messages: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.submitMessage = this.submitMessage.bind(this);
    }
    handleChange(event) {
      this.setState({
        input: event.target.value
      });
    }
    submitMessage() {
      const currentMessage = this.state.input;
      this.setState({
        input: '',
        messages: this.state.messages.concat(currentMessage)
      });
    }
    componentDidMount() {
        fetch("/greet").then(function(response) {
               return response.text();
            }).then((text) => {
                  this.setState({messages: this.state.messages.concat(text)})
                });
     }

    render() {
     return (
      <div className="App">
        <div className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Welcome to React</h2>
        </div>
        <h2>Type in a new Message:</h2>
        <input
             value={this.state.input}
             onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <p className="App-intro">
          The first message is read using Rest API!
        </p>
        <ul>
        {
          this.state.messages.map((message, indx)=>{
            return(
             <li key={indx}>{message}</li>
            )
          })
        }
        </ul>

      </div>
    );
  }
}

// React-Redux:
const mapStateToProps = (state) => {
  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
       dispatch(addMessage(newMessage))
    }
  }
};

//const Provider = ReactRedux.Provider;
//const connect = ReactRedux.connect;

// define the Container component here:
class Container extends React.Component {
  render() {
    const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Presentational);
    return (
     <ConnectedComponent/>
    )
  }
}

class AppWrapper extends React.Component {
  render() {
    // complete the return statement:
    return (
      <Provider store={store}>
      <Container/>
      </Provider>
    );
  }
};

export default AppWrapper;
