/**
 * Where all major up components are
 */
import React, { useState } from 'react';
import { Redirect } from 'react-router';

// bootstrap imports
import { Button, Form, Card } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

// API import
import API from '../Api.js';

// modal import
import {NewModal} from './Modal.js';

// corresponding style file
import {UpLogin, AccountContainer, AccountCard} from '../style/UpStyle.js';
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
    const response = await new API().pingToken();
    if (response.status !== 200) {
        console.log(response.data.errors[0].detail)
        setTitle("Error " + response.data.errors[0].status);
        setContent(response.data.errors[0].title);
        setShow(true);
    } else {
      // set token ONLY if successful
      localStorage.setItem('token', document.getElementById('formBasicPassword').value);
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

  const updateList = (newAccounts) => {
    console.log(newAccounts);
    const newState = newAccounts.map(obj => {return obj});
    setAccounts(newState)
  };

  const getAccounts = async() => {
    setAccounts([]);
    const response = await new API().getAccounts();
    if (response.status === 200) {
      const accounts = response.data.data;
      updateList(accounts);
    } else {
      console.log(response.data);
      setAccounts([{'Status': response.status,
                    "title": response.data.errors[0].title}
                  ]);
    }
  }

  const Account = (props) => {
    const account = props.data;
    
    if (typeof account !== 'object') {
      return (
        <div>Error {account.status} {account.title}</div>
      );
    } else {
      console.log(account);
      return (
        <AccountCard>
          <Card className='mr-2'>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Card.Link className="btn btn-light" href="#">Card Link</Card.Link>
              <Card.Link className="btn btn-light" href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </AccountCard>
      );
    }
  }

  // initial load
  React.useEffect(() => {
    getAccounts();
  }, 1000)

  return (
    <AccountContainer onLoad={getAccounts}>
      <h1 style={{paddingTop: "5%"}}>Welcome!</h1>
      <h10 style={{padding: "2%"}}>You're Logged In!</h10>
      <div>
        <Button onClick={getAccounts}>Update Accounts</Button>
      </div>
      <FadeIn>
        {accountList.map((account, index) => {
          return <Account key={index} data={account} />
        })}
      </FadeIn>
    </AccountContainer>
  );
}
