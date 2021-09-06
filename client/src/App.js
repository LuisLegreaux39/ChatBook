import './App.css';
import React, { useState } from 'react';
import Router from './Router';
import oi from 'socket.io-client';


// Socket configuration
const END_POINT = process.env.REACT_APP_SOCKET_CONECTION;
let socket = oi.connect(END_POINT);

const App = () => {
  const [userToken, setUserToken] = useState({})
  // Methods
  const saveUser = (data) => {
    let temp = `${data.userName}_user`;
    setUserToken(temp)
    return localStorage.setItem(temp, JSON.stringify(data))
  }
  const getUser = () => {
    let temp = localStorage.getItem(userToken);
    return temp ? (JSON.parse(temp)) : ({})
  }
  return (
    <div className="App">
      <Router socket={socket} saveUser={saveUser} getUser={getUser} />
    </div>
  );
}

export default App;
