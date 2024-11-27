import './App.scss';
import Remote from "./Remote";

import io from 'socket.io-client'
// import {useEffect} from "react";
import Display from "./Display";

const socket = io.connect("192.168.1.19:3001")

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

function App() {
    let display;

    if (detectMob()) {
        display = <Remote socket={socket}/>;
    } else {
        display = <Display socket={socket}/>;
    }

    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         alert(data.message)
    //     })
    // }, [socket]);

    return (
        <div className="App">
            {display}
        </div>
    );
}

export default App;