// react imports
import React, {useState} from 'react';

// bootstrap imports
import { Button, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Creates and shows a modal with title and content
 * @param {props} props
 * REQUIRES title and content 
 */
export function NewModal(props) {
  const [show, setShow] = useState(props.show);
  const title = props.title;
  const content = props.content;

  const toggle = () => setShow(false);
  // returns a modal with title and content given by props
  return (
    <>
      <Modal show={show} onHide={toggle} style={{color: 'white'}}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
