/**
 * Where all major up components are
 */

import React, { useState } from 'react';

// bootstrap imports
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import API from '../api.js';
import {NewModal} from './modal.js';

/**
 * Is the Login form. Will show modal error if not working properly
 * @returns React Component
 */
export function LoginForm() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('No Title');
  const [content, setContent] = useState('No Content');
  
  /**
   * Given an event, will handle fetching account data.
   * If successfull, will direct to showing all accounts
   * @param {event} e submit event
   */
  let handleSubmit = (e) => {
    //reset setShow
    setShow(false);
    setTitle('No Title');
    setContent('No Content');

    e.preventDefault();
    localStorage.setItem('token', document.getElementById('formBasicPassword').value);
    new API().pingToken()
      .then(response => {
        if (response.status !== 200) {
          response.json()
            .then(res => {
              console.log(res.errors[0].detail)
              setTitle("Error " + res.errors[0].status);
              setContent(res.errors[0].title);
              setShow(true);
            })
        } else {
          response.json()
            .then(res => {
              console.log(JSON.stringify(res.meta));
              alert(JSON.stringify(res));
            })
        }
      })
  }

  /**
   * default form
   */
  return (
    <>
      {
        show ?
        <NewModal show={show} title={title} content={content} />
        :
        null
      }
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword" >
          <Form.Label>Up Api Token</Form.Label>
          <Form.Control type="password" placeholder="Paste Token"/>
          <Form.Text className="text-muted">
            We'll never share your token with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </>
  );
}
