import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const Login = ({ socket, saveUser }) => {

    // HOOKS
    const [userName, setUserName] = useState('');
    const [currentRoom, setCurrentRoom] = useState('');
    const history = useHistory();

    // Methods
    const joinRoom = () => {

        if (userName !== "" && currentRoom !== "") {

            socket.emit("JOIN_ROOM", { userName, currentRoom })

            saveUser({ userName, currentRoom });

            let key = encrypt(currentRoom);

            return history.push(`/chat/${key}`);
        }
    }

    const encrypt = key => {
        return Buffer.from(key).toString('base64')
    }
    return (
        <div className="App">
            <br /><br />

            <div className="container">
                <h1 className="text-white">Joing a chat</h1>
                <br />
                <input type='text' className='form-control' placeholder=' Please add a User Name...' name='userName' onChange={(e) => setUserName(e.target.value)} />
                <br />
                <select className="form-select" aria-label="Default select example" onChange={(e) => setCurrentRoom(e.target.value)}>
                    <option className="text-white">Select a room</option>
                    <option value="ROOM-1">Room 1</option>
                </select>
                <br /><br />
                <button type='submit' className="btn bg-info text-white" onClick={() => joinRoom()}>Join</button>
            </div>

        </div>
    );
}

export default Login;
