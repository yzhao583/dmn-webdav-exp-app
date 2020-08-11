import React, { useEffect } from 'react';
import DmnJS from 'dmn-js';
import dishDecision from '../../resources/dish-decision.dmn';
import './_dmn-viewer.scss';

const DmnViewerComponent = () => {

    useEffect(() => {
        let viewer = new DmnJS({
            container: '#canvas',
            height: 500,
            width: '100%',
            keyboard: {
              bindTo: window
            }
        });

        viewer.importXML(dishDecision, function (err) {

            if (!err) {
                console.log('success!');

                viewer
                    .getActiveViewer()
                    .get('canvas')
                    // .zoom('fit-viewport');
            } else {
                console.log('something went wrong:', err);
            }
        });
    });

    return (
        <div id="canvas" className="dmn-viewer"></div>
    )
}

export default DmnViewerComponent;

