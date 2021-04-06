// react imports
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import React, { useState } from 'react';
import { Redirect } from 'react-router';

// bootstrap styles
import { Button, Navbar } from 'react-bootstrap';
// Up components
import {LoginForm, AccountData} from './Up.js';

// The general theme of the app
import {UpTheme} from '../style/UpStyle.js';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

/**
 * A router to navigate through react app
 * @returns A navbar Router
 */
export function AppRouter() {
  return (
    <>
      <Router>
        <Switch>

          <Route path="/about">
            <UpTheme>
              <Navbar bg="dark" variant="dark">
                <InfoNav/>
              </Navbar>
              <h1>This is the about page</h1>
            </UpTheme>
          </Route>

          <Route path ="/accounts">
            <UpTheme>
              <Navbar bg="dark" variant="dark">
                <UserNav/>
              </Navbar>
            
              <AccountData/>

            </UpTheme>
          </Route>

          <Route path="/">
            <UpTheme>
              <Navbar bg="dark" variant="dark">
                <InfoNav/>
              </Navbar>
              <LoginForm logged={localStorage.getItem('token') !== undefined && true}/>
            </UpTheme>
          </Route>

        </Switch>
      </Router>
    </>
  );
}

// when you're not logged in
function InfoNav() {
  return (
    <>
      <Header/>
      <NavbarCollapse className='justify-content-end'>
        <Home/> <About/>
      </NavbarCollapse>
    </>
  );
}

// when you're logged in
function UserNav() {
  return (
    <>
      <Header/>
      <NavbarCollapse className='justify-content-end'>
        <Home/> <About/> <LogOut/>
      </NavbarCollapse>
    </>
  );
}

// header for landing
function Header() {
  return (
    <>
        <Navbar.Brand href="/">
          <img
            src="/logo.gif"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Upbank Logo"
          />
        </Navbar.Brand>
        
    </>
  );
}

/**
 * Handles all logout functions including the logging out itself
 * @returns JSX Element
 */
function LogOut() {
  const [logOut, setLogOut] = useState(localStorage.getItem('token') === null);

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setLogOut(true);
  }

  return (
    <>
      <div>
      {
        logOut
        &&
        <Redirect to="/"/>
      }</div>
      <Button className='mr-2 btn btn-secondary' onClick={handleLogOut}>Log Out</Button>
    </>
    
  );
}

function About() {
  return (
    <Button className='mr-2 btn btn-primary' href='/about'>About</Button>
  );
}

function Home() {
  return (
    <Button className='mr-2 btn btn-primary' href='/'>Home</Button>
  );
}