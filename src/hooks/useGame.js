import { serverUrl } from "../util/util";

export default () => ({
   CreateLobby: async () => {
        return fetch(serverUrl + '/lobby', {
            method: 'POST'
        }).then(res => res.json()).then(json => json.LOBBY_ID)
    }
})