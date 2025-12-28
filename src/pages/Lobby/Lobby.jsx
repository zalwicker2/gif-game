import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Lobby() {
    const location = useLocation();
    const { lobbyId, name } = location.state ?? {}

    const [messages, setMessages] = useState([]);
    const [playerList, setPlayerList] = useState([])

    const socket = useRef();

    useEffect(() => {
        let ws = new WebSocket('ws://localhost:5000/lobby/' + lobbyId + '/?name=' + name )
        ws.onmessage = function (event) {
            const response = event;
            const data = JSON.parse(response.data);
            console.log(data);
            switch(data.action) {
                case 'CHAT_MESSAGE':
                    setMessages(m => [...m, data])
                    break;
                case 'UPDATE_PLAYER_LIST':
                    setPlayerList(data.player_list);
                    break;
            }
        }
        socket.current = ws;
    }, [])

    function SendMessage(e) {
        e.preventDefault();
        socket.current.send(e.target.elements.message.value)
    }

    return (
        <>
            <div>Players
                {playerList.map(p => p.name)}
            </div>
            <div>LOBBY CODE: <input type="text" value={lobbyId} disabled /></div>
            <div>
                <form action="" onSubmit={SendMessage}>

                    <input type="text" name="message" />
                    <button>Send</button>
                </form>
                <div>
                    {messages.map(m => <p><span className="sender">{m.sender}:</span> {m.message}</p>)}
                </div>
            </div>
        </>
    )
}