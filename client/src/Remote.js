// import {useEffect} from "react";

function Remote({socket}) {
    const directions = [
        "arrow-top",
        "arrow-left",
        "arrow-right",
        "arrow-bottom"
    ];

    const actions = [
        "action-back",
        "action-select"
    ];

    const directionalControl = (event) => {
        const clickedElId = event.target.id;

        if (directions.includes(clickedElId)) {
            socket.emit('click_button', clickedElId)
        }
    }

    const actionControl = (event) => {
        const clickedElId = event.target.id;

        // if (actions.includes(clickedElId)) {
            socket.emit('click_button', clickedElId)
        // }
    }

    return (
        <div id="remoteControllerDisplay">
            <div className="mobile-orientation">
                Passe le téléphone à l'horizontal
            </div>
            <div className="remoteController">
                <div className="arrows" onClick={directionalControl}>
                    <div className="arrows--top">
                        <span id="arrow-top" className="control--button"></span>
                    </div>
                    <div className="arrows--middle">
                        <span id="arrow-left" className="control--button"></span>
                        <span id="arrow-right" className="control--button"></span>
                    </div>
                    <div className="arrows--bottom">
                        <span id="arrow-bottom" className="control--button"></span>
                    </div>
                </div>
                <div className="actions" onClick={actionControl}>
                    <span id="action-back" className="control--button" data-keyname="B"></span>
                    <span id="action-select" className="control--button" data-keyname="A"></span>
                </div>
            </div>
        </div>
    )
}

export default Remote;