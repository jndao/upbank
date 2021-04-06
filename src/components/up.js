/**
 * Where all major up components are
 */
import React, { useState } from 'react';
import { Redirect } from 'react-router';

// bootstrap imports
import { Button, Form, Fade } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

// API import
import API from '../Api.js';

// modal import
import {NewModal} from './Modal.js';

// corresponding style file
import {UpLogin, AcContainer} from '../style/UpStyle.js';
import FadeIn from 'react-fade-in';


/**
 * Is the Login form. Will show modal error if not working properly
 * @returns React Component
 */
export function LoginForm(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('No Title');
  const [content, setContent] = useState('No Content');
  const [redirect, setRedirect] = useState(localStorage.getItem('token') !== null);
  
  

  /**
   * Given an event, will handle fetching account data.
   * If successfull, will direct to showing all accounts
   * @param {event} e submit event
   */
  const handleSubmit = async(e) => {
    //reset setShow
    setShow(false);
    setTitle('No Title');
    setContent('No Content');

    e.preventDefault();
    localStorage.setItem('token', document.getElementById('formBasicPassword').value);
    const response = await new API().pingToken();
    if (response.status !== 200) {
        console.log(response.data.errors[0].detail)
        setTitle("Error " + response.data.errors[0].status);
        setContent(response.data.errors[0].title);
        setShow(true);
    } else {
        console.log(JSON.stringify(response.data));
        setRedirect(true);
    
    }
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
      <div>
      {
        redirect
        &&
        <Redirect to="/accounts"/>
      }</div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword" >
          <Form.Label>Up Api Token</Form.Label>
          <Form.Control type="password" placeholder="Paste token here"/>
          <Form.Text className="text-muted">
            Token is not shared. All sensitive data is stored to your local machine.
          </Form.Text>
        </Form.Group>
        <Button className="btn btn-primary" type="submit" >
          Log In
        </Button>
        <a className="btn btn-link text-left text-muted" href="https://api.up.com.au/getting_started" rel="noreferrer" target="_blank">
          Don't have a token?
        </a>

      </Form>
    </UpLogin>
  );
}
 

export function AccountData() {
  const [accountList, setAccounts] = useState([]);

  const getAccounts = async() => {
    const response = await new API().getAccounts();
    if (response.status === 200) {
      setAccounts(response.data);
    } else {
      console.log(response.data);
      setAccounts(['Error ' + response.status + " " + response.data.errors[0].title]);
    }
  }

  const Account = (props) => {
    const account = props.data;

    return (
      <div>{account}</div>
    );
  }

  return (
    <AcContainer>
      <h1>Welcome! Your accounts are below.</h1>
      <h5>You are logged in!</h5>
      <div>
        <Button onClick={getAccounts}>Show/Update Accounts</Button>
      </div>
      <FadeIn>
        {accountList.map((account, index) => {
          return <Account key={index} data={account} />
        })}
      </FadeIn>
    </AcContainer>
  );
}
