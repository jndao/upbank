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
  const [show, setShow] = useState(true);
  const title = props.title;
  const content = props.content;

  const toggle = () => setShow(!show);

  return (
    <>
      <Modal show={show} onHide={toggle}>
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

/*
export class NewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        show: props.show
    };
    this.toggle = this.toggle.bind(this);
    this.title = props.title;
    this.content = props.content;
  }

  toggle() {
      this.setState({
          show: !this.state.show
      });
  }
  
  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>{this.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.content}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggle}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
*/