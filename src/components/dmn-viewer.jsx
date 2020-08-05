import React from 'react';
import DmnViewer from 'dmn-js';
import dishDecision from '../resources/dish-decision.dmn';

const DmnViewerComponent = () => {

    let dmnJS = new DmnViewer({
        container: '#canvas'
    });

    dmnJS.importXML(dishDecision, function (err) {

        if (!err) {
            console.log('success!');

            dmnJS
                .getActiveViewer()
                .get('canvas')
                .zoom('fit-viewport');
        } else {
            console.log('something went wrong:', err);
        }
    });

    return (
        <div id="canvas"></div>
    )
}

export default DmnViewerComponent;

