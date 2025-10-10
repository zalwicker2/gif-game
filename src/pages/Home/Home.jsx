import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext";
import useGame from "../../hooks/useGame";

export default function Home() {
    const navigate = useNavigate();

    const { CreateLobby } = useGame();

    function JoinLobby(id) {
        navigate('/lobby', { state: { lobbyId: id } })
    }

    function GenerateLobby() {
        CreateLobby().then(code => {
            JoinLobby(code);
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
                <input type="text" name="id"/>
                <div className="form-group">
                </div>
                <button>Join</button>
            </form>
            <br />
            <button onClick={GenerateLobby}>Create Room</button>

        </>
    )
}