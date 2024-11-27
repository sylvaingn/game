import {useState, useEffect} from 'react';

function Display({socket}) {
    const [controlsNames, setControlsNames] = useState(''); // État pour gérer controlsNames

    useEffect(() => {
        socket.on('received_control', (data) => {
            setControlsNames(data.direction); // Met à jour l'état
        });

        return () => {
            socket.off('received_control');
        };
    }, [socket]);

    return (
        <div>
            <h1>Display</h1>
            <ul>{controlsNames}</ul>
            {/* React met à jour automatiquement */}
        </div>
    );
}


export default Display;