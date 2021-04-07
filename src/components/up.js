/**
 * Where all major up components are
 */
import React, { useState, useEffect} from 'react';
import { Redirect } from 'react-router';
// bootstrap imports
import { Button, Form, Card, ListGroup } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

// API import
import API from '../Api.js';

// modal import
import {NewModal} from './Modal.js';

// corresponding style file
import {UpLogin, AccountContainer, AccountCard, TransactionsContainer} from '../styles/UpStyle.js';
import FadeIn from 'react-fade-in';

// infinite scroll
import InfiniteScroll from 'react-infinite-scroll-component';
import loading from '../assets/loading.svg';

/**
 * Is the Login form. Will show modal error if not working properly
 * @returns React Component
 */
export function LoginForm(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('No Title');
  const [content, setContent] = useState('No Content');
  const [redirect, setRedirect] = useState(sessionStorage.getItem('token') !== null);
  
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
        setTitle("Error " + response.data.errors[0].status);
        setContent(response.data.errors[0].title);
        setShow(true);
    } else {
      // set token ONLY if successful
      sessionStorage.setItem('token', document.getElementById('formBasicPassword').value);
      setRedirect(true);
    }
  }

  /**
   * default login form
   */
  return (
    <>
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
              By using this experimental app, you understand and agree to the <a href="https://johndao.dev/upbank/#/terms" rel="noreferrer" target="_blank">terms of use.</a><br />
              All sensitive data is stored to your local device and erased when you close your tab. If you feel if your token has been compromised, regenerate a new one <a href="https://api.up.com.au/getting_started" rel="noreferrer" target="_blank">here.</a>
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
    </>
  );
}

/**
 * Will fetch and infinitely paginate (until none left) all
 * recent transactions!
 * @returns JSX Element
 */
export function RecentData() {
  const [tList, updateTList] = useState([]);
  const [tObject, setTObject] = useState([]);
  const [page, updatePage] = useState(0);
  const [more, hasMore] = useState(true);


  // gets further pages of results based on initial getFirstTransactions
  const getMoreTransactions = async() => {
    // getting first page
    if (page === 0) {
      const response = await new API().getTransactions();
      if (response.status === 200) {
        // first page
        setTObject(response.data);
        // adding first list of objects
        updateTList(tList.concat(response.data.data));
        // adding page count
        updatePage(page + 1);
      } else {
        console.error('help');
      }
    // getting next page
    } else if (tObject.links.next !== null) {
      // get next page object
      const response = await new API().getTransactionPage(tObject.links.next);
      setTObject(response.data);
      // adding next page to list
      updateTList(tList.concat(response.data.data));
      // increasing page number
      updatePage(page + 1);
    // no more pages
    } else {
      hasMore(false)
    }
  }

  useEffect(() => {
    getMoreTransactions();
  }, [])

  
  return (
    <FadeIn>
      <h3 style={{paddingBottom: '2.5%'}}>Latest Transactions</h3>
      <TransactionsContainer
        id="scrollableDiv"
        style={{
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
        className='w-full bg-white text-gray-900 rounded overflow-hidden'
      > 
        <InfiniteScroll
          dataLength={tList.length} //This is important field to render the next data
          next={getMoreTransactions}
          hasMore={more}
          loader={<h4 style={{textAlign: 'center', paddingTop: '5%'}}><img src={loading} height="75" width="75"/></h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more transactions to show</b>
            </p>
          }
        >
          {tList.map((t, index) => (
          <div style={{color: 'black', background: 'white', borderBottom:'3px solid #e2e8f0', minHeight:'50px', padding:'10px'}} key={index}>
            {t.attributes.description} <span className="text-muted small">{t.attributes.settledAt}</span><br /> <span style={{color:(parseInt(t.attributes.amount.value)) >= 0 ? 'green' : 'red'}}>{t.attributes.amount.value}</span>
          </div>
    ))}
        </InfiniteScroll>
      </TransactionsContainer>
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
            {index + 1}. {t.attributes.description}<text style={{float: 'right'}}>Value: {t.attributes.amount.currencyCode}$ <span style={{color:(parseInt(t.attributes.amount.value)) >= 0 ? 'green' : 'red'}}>{t.attributes.amount.value}</span></text><br />
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
          currencyCode = attributes.balance.currencyCode,
          createdAt = attributes.createdAt.substring(0, attributes.createdAt.indexOf('T'));
      const handleShowTransaction = async() => {
      // showing loading modal before to avoid confusion between click and opening modal
      setTitle('Loading...');
      setContent('Loading...');
      showModal(true);
      
      // creating and showing new modal
      const response = await new API().retrieveTransactions(account.id);
      // close loading modal
      showModal(false);

      if (response.status === 200) {
        // setting content for successful retrieval and showing list
        setTitle(displayName + "'s Recent Transactions");
        setContent(transactionList(response.data.data));
        showModal(true);

      } else {
        // setting content for unsuccessful retrieval and showing error
        setTitle('Error ' + response.status);
        setContent(response.title);
        showModal(true);
      }
    }
    // returning an account card
    return (
      <AccountCard>
        <div>{show &&<NewModal show={show} title={title} content={content} />}</div>
        <Card className="hvr-underline-from-left" onClick={handleShowTransaction}>
          <Card.Header>Account Type: {accountType}</Card.Header>
          <Card.Body>
            <Card.Title>{displayName}</Card.Title>
            <Card.Subtitle className="mb-3 mt-2 text-muted text-small">Created on: {createdAt}</Card.Subtitle>
            <Card.Title className="mb-4">
              Balance: {currencyCode}$ {balance}
            </Card.Title>
            <Card.Link className="btn btn-secondary" onClick={handleShowTransaction}>Show Recent Transactions</Card.Link>
          </Card.Body>
        </Card>
      </AccountCard>
    );
  }
}

/**
 * Handles most of the initial account data functions
 * Shows a list of account cards with results
 * @returns jsx element
 */
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
      setAccounts([{'status': response.status,
                    'title': response.data.errors[0].title,
                    'detail': response.data.errors[0].detail}
                  ]);
    }
  }
  // initial load of the accounts when logging in
  useEffect(() => {
    const getAccounts = async() => {
      setAccounts([]);
      const response = await new API().getAccounts();
      if (response.status === 200) {
        const accounts = response.data.data;
        updateList(accounts);
      } else {
        setAccounts([{'status': response.status,
                      'title': response.data.errors[0].title,
                      'detail': response.data.errors[0].detail}
                    ]);
      }
    }
    getAccounts();
  }, [])

  // returns the list of accounts and a button to refresh them ONLY. No headers
  return (
    <>
      <FadeIn><Button onClick={getAccounts}>Refresh Accounts</Button></FadeIn>
      <AccountContainer >
          {accountList.map((account, index) => {
            return <FadeIn key={index} transitionDuration="800"><Account data={account} /></FadeIn>
          })}
      </AccountContainer>
    </>
  );
}
