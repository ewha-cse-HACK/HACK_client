//import React, { useState, useEffect } from 'react'
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import logo from './logo.svg';
//import './App.css';
//import { Button } from "@chakra-ui/react";
//import Stomp from 'stompjs';
//import SockJS from 'sockjs-client';
// <Button colorScheme="blue">로그인</Button>
import React from 'react';
import './App.css';
import OurStory from './OurStory';

function App() {
  return (
    <div className="App">
      <OurStory />
    </div>
  );
}


/*
const Home = () => <div>Our Story</div>;
const About = () => <div>How to use</div>;
const Contact = () => <div>Community</div>;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Login />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/


/*
const App = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('/ws');
    const stomp = Stomp.over(socket);
    stomp.connect({}, frame => {
      setStompClient(stomp);
    });
    return () => {
      if (stomp) stomp.disconnect();
    };
  }, []);

  const login = () => {
    // 로그인 API 호출 및 사용자 정보 설정
  };

  const sendMessage = () => {
    if (stompClient && input) {
      stompClient.send('/app/chat', {}, JSON.stringify({ content: input, sender: user }));
      setInput('');
    }
  };

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe('/topic/chat', message => {
        const newMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
      return () => subscription.unsubscribe();
    }
  }, [stompClient]);

  return (
    <div className="App">
      {user ? (
        <>
          <div className="chat">
            {messages.map((message, index) => (
              <div key={index} className={message.sender === user ? 'sent' : 'received'}>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <div className="input">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={sendMessage}>전송</button>
          </div>
        </>
      ) : (
        <button onClick={login}>Google 로그인</button>
      )}
    </div>
  );
};
*/
/*
const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          <li>
            <Link to="/contact">연락</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Router>
  );
};
*/
export default App;
