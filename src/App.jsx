import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);

  const socket = useRef();

  useEffect(() => {
    let ws = new WebSocket('ws://localhost:5000/ws')
    ws.onmessage = function (event) {
      const response = event;
      console.log(response);
      const data = JSON.parse(response.data);
      setMessages(m => [...m, data.message])
    }
    socket.current = ws;
  })

  function SendMessage(e) {
    e.preventDefault();
    socket.current.send(e.target.elements.message.value)
  }

  return (
    <>
      <div>
        <form action="" onSubmit={SendMessage}>

          <input type="text" name="message" />
          <button>Send</button>
        </form>
        <div>
          {messages.map(m => <p>{m}</p>)}
        </div>
      </div>
    </>
  )
}

export default App
