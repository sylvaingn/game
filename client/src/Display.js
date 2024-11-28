import {useState, useEffect} from 'react';

function Display({socket}) {
    const [controlsNames, setControlsNames] = useState(''); // État pour gérer controlsNames
    let currentPosition = 0;

    function getCoords(elem) { // crossbrowser version
        const box = elem.getBoundingClientRect();

        const body = document.body;
        const docEl = document.documentElement;

        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        const clientTop = docEl.clientTop || body.clientTop || 0;
        const clientLeft = docEl.clientLeft || body.clientLeft || 0;

        const top = box.top + scrollTop - clientTop;
        const left = box.left + scrollLeft - clientLeft;

        return {top: Math.round(top), left: Math.round(left), behavior: "smooth"};
    }

    useEffect(() => {
        socket.on('received_control', (data) => {
            const control = data.control;

            const gridItems = document.querySelectorAll('.grid-template > *');
            const selectedItem = document.querySelector('.grid-template > .selected');

            if (selectedItem === null || gridItems === null) return;

            const minPosition = 0;
            const maxTruePosition = gridItems.length
            const maxPosition = maxTruePosition - 1;

            const gridColumnTemplate = 3;

            if (currentPosition >= minPosition && currentPosition <= maxPosition) {
                selectedItem.classList.remove('selected');

                if (control === 'arrow-right' && currentPosition < maxPosition) {
                    currentPosition++;
                }

                if (control === 'arrow-left' && currentPosition > minPosition) {
                    currentPosition--;
                }

                if (control === 'arrow-top') {
                    if (currentPosition - gridColumnTemplate >= minPosition) {
                        currentPosition = currentPosition - gridColumnTemplate;
                    }
                }

                if (control === 'arrow-bottom') {
                    if (currentPosition + gridColumnTemplate <= maxPosition) {
                        currentPosition = currentPosition + gridColumnTemplate;
                    }
                }

                const currentEl = gridItems[currentPosition];
                currentEl.classList.add('selected')

                window.scrollTo(getCoords(currentEl));

                if (control === 'action-select') {
                    console.log(currentEl.innerText)
                }

                if (control === 'action-back') {
                    console.log('retour')
                }
            }

        });

        return () => {
            socket.off('received_control');
        };
    }, [socket]);

    return (
        <div>
            <h1>Let's play</h1>
            <div className="grid-template">
                <div className="selected">Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
                <div>Item 5</div>
                <div>Item 6</div>
                <div>Item 7</div>
                <div>Item 8</div>
                <div>Item 9</div>
                <div>Item 10</div>
                <div>Item 11</div>
                <div>Item 12</div>
                <div>Item 13</div>
                <div>Item 14</div>
            </div>
        </div>
    );
}

export default Display;