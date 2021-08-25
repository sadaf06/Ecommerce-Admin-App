import React from 'react'
import { Modal, Button } from 'react-bootstrap'

/**
* @author
* @function Modle
**/

const Modle = (props) => {
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size={props.size}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.tittle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={props.btncloseColor ? props.btncloseColor : "secondary"} onClick={props.onHide}>
                        {props.btnclose ? props.btnclose : "Close"}
                    </Button>
                    <Button variant={props.btnColor} onClick={props.btnOnClick}>
                        {props.buttonName}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default Modle