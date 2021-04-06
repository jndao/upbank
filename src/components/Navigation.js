// react imports
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import React, { useState } from 'react';
import { Redirect } from 'react-router';

// bootstrap styles
import { Button, Navbar } from 'react-bootstrap';

// landing page/login form
import {LoginForm} from './Up.js';

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
            <h1>This is the about page</h1>
          </Route>

          <Route path ="/accounts">
            <UpTheme>
              <Navbar bg="dark" variant="dark">
                <Header/><LogOut/>
              </Navbar>
            
            <h1>This is the accounts page</h1></UpTheme>

          </Route>

          <Route path="/">
            <UpTheme>
              <Navbar bg="dark" variant="dark">
                <Header/>
              </Navbar>

              <LoginForm/>
            </UpTheme>
          </Route>

        </Switch>
      </Router>
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
  const [logOut, setLogOut] = useState(false);

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

      <NavbarCollapse className='justify-content-end'>
        <Button className='btn btn-secondary' onClick={handleLogOut}>Log out</Button>
      </NavbarCollapse>
    </>
    
  );
}