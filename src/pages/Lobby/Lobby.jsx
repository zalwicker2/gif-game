import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Lobby() {
    const location = useLocation();
    const { lobbyId } = location.state ?? {}

    const [messages, setMessages] = useState([]);

    const socket = useRef();

    useEffect(() => {
        let ws = new WebSocket('ws://localhost:5000/lobby/' + lobbyId )
        ws.onmessage = function (event) {
            const response = event;
            console.log(response);
            const data = JSON.parse(response.data);
            setMessages(m => [...m, data.message])
        }
        socket.current = ws;
    }, [])

    function SendMessage(e) {
        e.preventDefault();
        socket.current.send(e.target.elements.message.value)
    }

    return (
        <>
            <div>LOBBY CODE: <input type="text" value={lobbyId} disabled /></div>
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