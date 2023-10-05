// 1. Imports from libraries or frameworks
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useTheme } from '@emotion/react';

// 2. Absolute imports or imports from modules
import { ROOMS, SOCKET_SERVER } from '../constants/socket';

// 3. Components or utilities from UI libraries
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

// 4. Relative imports from your own project
import '../themes/theme.css';


const UserForm = ({ onJoin }) => {
    const [user, setuser] = useState('');
    const [room_id, setRoom] = useState('');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <TextField
                label="user"
                value={user}
                onChange={(e) => setuser(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <TextField
                label="room_id"
                value={room_id}
                onChange={(e) => setRoom(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={() => onJoin(user, room_id)}>
                Join Chat
            </Button>
        </Box>
    );
};

const ChatView = ({ user, room_id }) => {
    const theme = useTheme();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [userColors, setUserColors] = useState({});


    const getRandomColorFromTheme = (theme) => {
        const colors = Object.values(theme.random);
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    useEffect(() => {
        const newSocket = socketIOClient(`ws://${SOCKET_SERVER.IP}:${SOCKET_SERVER.PORT}`);
        setSocket(newSocket);

        newSocket.emit('user_connect', { user: user });

        newSocket.emit('join_chat_room', { user: user, room_id: room_id });

        newSocket.on('receive_message', (user, message) => {
            setMessages((prevMessages) => [...prevMessages, { user, message }]);
            if (!userColors[user]) {
                setUserColors(prevColors => ({
                    ...prevColors,
                    [user]: getRandomColorFromTheme(theme)
                }));
            }
        });

        return () => newSocket.close();
    }, [user, room_id]);

    const sendMessage = () => {
        if (socket) {
            socket.emit('sent_message', { user: user, message: inputValue, room_id: room_id });
            setInputValue('');
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Enter' && inputValue) {
            sendMessage();
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center', height: '100vh', width: '100vw' }}>
            <Typography variant='h5' sx={{ position: 'absolute', top: '5%' , left: '5%'}}><strong>ROOM ID: {room_id}</strong></Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '60vw',
                    maxHeight: '80vh',
                    mt:10
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            alignSelf: msg.user === user ? 'flex-end' : 'flex-start',
                            textAlign: msg.user === user ? 'right' : 'left',
                            p: 1,
                            backgroundColor: msg.user === user ? theme.palette.primary.light : userColors[msg.user],
                            borderRadius: 2,
                            borderColor: theme.scrollBar.main,
                            m: 1,
                            maxWidth: '40vw',
                            width: 'fit-content'
                        }}
                    >
                        <Typography variant='h6'><strong>{msg.user}: </strong>{msg.message}</Typography>
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    p: 1,
                    position: 'fixed',
                    bottom: '5%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    maxWidth: '60vw'
                }}
            >
                <TextField
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={handleKeyUp}
                    placeholder="Write a message..."
                    variant="outlined"
                    sx={{ mr: 1 }}
                />
                <Button variant="contained" color="primary" onClick={sendMessage}>
                    Send
                </Button>
            </Box>
        </Box>
    );

};

const Chat = () => {
    const [hasJoined, setHasJoined] = useState(false);
    const [user, setuser] = useState('');
    const [room_id, setRoom] = useState('');

    const handleJoin = (user, room_id) => {
        setuser(user);
        if (!room_id) {
            setRoom(ROOMS.DEFAULT)
        }
        setRoom(room_id);
        setHasJoined(true);
    };

    return hasJoined ? <ChatView user={user} room_id={room_id} /> : <UserForm onJoin={handleJoin} />;
};

export default Chat;







