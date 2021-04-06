/**
 * Where all major up components are
 */
import React, { useState } from 'react';
import { Redirect } from 'react-router';

// bootstrap imports
import { Button, Form, Card, ListGroup } from 'react-bootstrap';
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
    <FadeIn>
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
    </FadeIn>
  );
}

/**
 * Given an array of transaction objects, will return an 
 * ordered list of transactions
 * used to get recent transactions 
 * @param {array} obj all transactions
 */
const transactionList = (list) => {
  return (
    <ListGroup>
      {list.map((t, index) => {
        return <ListGroup.Item key={index}>
            {index + 1}. {t.attributes.description}<text style={{float: 'right'}}>Value: {t.attributes.amount.currencyCode} ${t.attributes.amount.value}</text><br />
          </ListGroup.Item>
      })}
    </ListGroup>
  )
}

/**
 * Given account general data, will show card about account
 * @param {Object} props.data Information on account
 * @returns jsx element card
 */
const Account = (props) => {
  const account = props.data;
  const [show, showModal] = useState(false);
  const [title, setTitle] = useState('No Title');
  const [content, setContent] = useState('No Content');
  
  if (typeof account !== 'object') {
    return (
      <div>Error {account.status} {account.title}</div>
    );
  } else if (account.status !== undefined) {
    return (
      <div>Error {account.status}, {account.title} <br />{account.detail}</div>
    );
  } else {
    const attributes = account.attributes;
    const displayName = attributes.displayName,
          accountType = attributes.accountType,
          balance = attributes.balance.value,
          createdAt = attributes.createdAt.substring(0, attributes.createdAt.indexOf('T'));

    const handleShowTransaction = async() => {
      // reset modal if already open
      showModal(false);
      setTitle('No Title');
      setContent('No Content');

      // creating and showing new modal
      const response = await new API().retrieveTransactions(account.id);
      if (response.status === 200) {
        setTitle(displayName + "'s Recent Transactions");
        setContent(transactionList(response.data.data));
        showModal(true);
      } else {
        setTitle('Error ' + response.status);
        setContent(response.title);
        showModal(true)
      }
      
    }

    return (
      <AccountCard >
        <div>{show &&<NewModal show={show} title={title} content={content} />}</div>
        <Card className="hvr-underline-from-left" onClick={handleShowTransaction}>
          <Card.Header>Account Type: {accountType}</Card.Header>
          <Card.Body>
            <Card.Title>{displayName}</Card.Title>
            <Card.Subtitle className="mb-3 mt-2 text-muted text-small">Created on: {createdAt}</Card.Subtitle>
            <Card.Title className="mb-4">
              Balance: {balance}
            </Card.Title>
            <Card.Link className="btn btn-secondary" onClick={handleShowTransaction}>Show Recent Transactions</Card.Link>
          </Card.Body>
        </Card>
      </AccountCard>
    );
  }
}


export function AccountData() {
  const [accountList, setAccounts] = useState([]);


  const updateList = (newAccounts) => {
    const newState = newAccounts.map(obj => {return obj});
    setAccounts(newState)
  };

  /**
   * Get all accounts and sets state for accountList
   * Shows error if nothing exists
   */
  const getAccounts = async() => {
    setAccounts([]);
    const response = await new API().getAccounts();
    if (response.status === 200) {
      const accounts = response.data.data;
      updateList(accounts);
    } else {
      console.log(response);
      setAccounts([{'status': response.status,
                    'title': response.data.errors[0].title,
                    'detail': response.data.errors[0].detail}
                  ]);
    }
  }

  // initial load
  React.useEffect(() => {
    getAccounts();
  }, [])

  return (
    <>
      <h1 style={{paddingTop: "3%"}}>Welcome!</h1>
      <h10>You're Logged In!</h10>
      <div style={{padding: "1%"}}>
        <Button onClick={getAccounts}>Refresh Accounts</Button>
      </div>
      <AccountContainer >
          {accountList.map((account, index) => {
            return <FadeIn transitionDuration="800"><Account key={index} data={account} /></FadeIn>
          })}
      </AccountContainer>
      
    </>
  );
}
