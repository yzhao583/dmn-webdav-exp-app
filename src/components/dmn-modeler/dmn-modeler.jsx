import React, { useEffect, useState } from 'react';
import DmnModeler from 'dmn-js/lib/Modeler';
import './_dmn-modeler.scss';

import NetworkService from "../../services/network";

const DmnModelerComponent = () => {

    const [dmnModeler, setDmnModeler] = useState();
    const [currentFiles, setCurrentFiles] = useState([]);
    const webdavClient = NetworkService.connect();

    useEffect(() => {
        NetworkService.getFiles(webdavClient).then(response => {
            setCurrentFiles(response);
        }, error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {

        if (currentFiles.length > 0) {
            NetworkService.getFile(webdavClient, currentFiles[0].filename).then(fileData => {

                const dmnModelerInstance = new DmnModeler({
                    container: '.editor-container',
                    height: 800,
                    width: '100%',
                    keyboard: {
                        bindTo: window
                    }
                });

                dmnModelerInstance.importXML(fileData, function (err) {

                    if (err) {
                        return console.error('could not import DMN 1.1 diagram', err);
                    }

                    let activeEditor = dmnModelerInstance.getActiveViewer();

                    // access active editor components
                    let canvas = activeEditor.get('canvas');

                    // zoom to fit full viewport
                    canvas.zoom('fit-viewport');
                });

                setDmnModeler(dmnModelerInstance);
            }, error => {
                console.error(error);
            });
        } else {
            console.log("No dmn files found")
        }


    }, [currentFiles]);

    /**
    * Save diagram contents and print them to the console.
    */
    const exportDiagram = () => {

        dmnModeler.saveXML({ format: true }, function (err, xml) {

            if (err) {
                return console.error('could not save DMN 1.1 diagram', err);
            }

            alert('Diagram uploaded. Please refresh the page');

            NetworkService.updateFile(webdavClient, currentFiles[0].filename, xml).then(response => {
                console.log(response);
            }, error => {
                console.error(error);
            });
        });
    }

    return (
        <div className="test-container">
            <div className="editor-parent">
                <div className="editor-container"></div>
            </div>
            <button id="save-button" onClick={exportDiagram}>Save</button>
        </div>
    )
}

export default DmnModelerComponent;

