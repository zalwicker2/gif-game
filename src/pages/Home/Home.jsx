import './Home.css'
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext";
import useGame from "../../hooks/useGame";
import { useRef, useState } from 'react';

export default function Home() {
    const [generatedCode, setGeneratedCode] = useState(null);
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const nameRef = useRef();

    const { CreateLobby } = useGame();

    function JoinLobby(id) {
        const name = nameRef.current.value;
        if(name == null || name.trim() == '') {
            nameRef.current.reportValidity();
            return;
        }
        navigate('/lobby', { state: { lobbyId: id, name } })
    }

    function GenerateLobby() {
        CreateLobby().then(code => {
            setGeneratedCode(code)
        })
    }

    function JoinLobbyFromForm(e) {
        e.preventDefault();
        const id = e.target.elements.id.value;
        JoinLobby(id);
    }

    return (
        <>
            <form onSubmit={JoinLobbyFromForm}>
                <div className="form-group">
                    <label htmlFor="">Lobby Code</label>
                    <input type="text" name="id" disabled={generatedCode != null} onInput={(e) => setCode(e.target.value)} value={generatedCode ?? code} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" ref={nameRef} required />
                </div>
                <button>Join</button>
            </form>
            <br />
            <button onClick={GenerateLobby}>Create Room</button>
        </>
    )
}