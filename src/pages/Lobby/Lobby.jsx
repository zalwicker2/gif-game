import './Lobby.css'
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
            <div className="lobby-code">
                <span>Lobby Code</span>
                {lobbyId}
            </div>
            <div className="lobby-bottom-bar">
                <div className="players-list">
                    <span>Players</span>
                    <ul>
                        {playerList?.map(p => <li className={'player' + (p.disconnected ? 'disconnected': '')}>{p.name}</li> )}
                    </ul>
                </div>
                <div className="chat-box">
                    <div className='sent-messages'>
                        {messages.map(m => <p><span className="sender">[{m.sender}]:</span> {m.message}</p>)}
                    </div>
                    <form className='chat-input' action="" onSubmit={SendMessage}>
                        <input type="text" name="message" autoComplete='off' />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}