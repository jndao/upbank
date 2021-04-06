/**
 * Where all major up components are
 */

import React, { useState } from 'react';
// bootstrap imports
import { Button, Form, Navbar } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import API from '../Api.js';
import {NewModal} from './Modal.js';
import {UpTheme, UpLogin} from '../style/UpStyle.js';

export function Header() {
  return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            src="/logo.gif"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Upbank Logo"
          />
        </Navbar.Brand>
      </Navbar>
  );
}

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
    <UpLogin><h1>Log In</h1> <br />
      <div>
      {
        show
        &&
        <NewModal show={show} title={title} content={content} />
      }</div>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword" >
          <Form.Label>Up Api Token</Form.Label>
          <Form.Control type="password" placeholder="Paste token here"/>
          <Form.Text className="text-muted">
            Token is not shared. All data is stored to your local machine.
          </Form.Text>
        </Form.Group>
        <Button classname="btn btn-primary" type="submit" >
          Log In
        </Button>
        <a className="btn btn-link text-left text-muted" href="https://api.up.com.au/getting_started" target="_blank">
          Don't have a token?
        </a>

      </Form>
    </UpLogin>
  );
}
