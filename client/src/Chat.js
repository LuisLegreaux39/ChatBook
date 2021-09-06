import React, { useState, useEffect } from 'react';

const Chat = ({ socket, getUser }) => {

    // Reading info of the user from the local storage
    let { userName, currentRoom } = getUser()

    // Hooks
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Methods
    const sendMessage = async () => {
        if (currentMessage !== "") {
            let msgData = {
                room: currentRoom,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit('SEND_MESSAGE', msgData);
            setMessages(prevMessages => [...prevMessages, msgData]);

        }
        return;
    }
    useEffect(() => {
        console.log("Executed")
        socket.on("RECIEVE_MESSAGES", (data) => {
            setMessages(prevMessages => [...prevMessages, data])
        })
    }, [socket])
    return (
        <div className='container chat-window'  >
            User Name : {userName}
            <div className='chat-header'>
                <h1>Live chat for</h1>
            </div>
            <div className='chat-body'>
                {messages.map(msg => {
                    return (<div className='message' id={msg.author === userName ? ("You") : ("other")}>
                        <div className='message-content'>{msg.message}</div>
                        <br />
                        <div className='message-meta'>
                            <p>{msg.author === userName ? ("You") : (msg.author)}</p>
                            <p>{msg.time}</p>

                        </div>
                    </div>)
                })}
            </div>
            <div className='chat-footer'>
                <input type='text' placeholder='Hey..' onChange={e => setCurrentMessage(e.target.value)} />
                <button onClick={() => sendMessage()}>&#9658;</button>
            </div>

        </div>
    );
};

export default Chat;