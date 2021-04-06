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
import {AboutContent} from './About.js';

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
                <AboutContent />
            </UpTheme>
            <NavFooter/>
          </Route>

          <Route path ="/accounts">
            <UpTheme>
              <Navbar bg="dark" variant="dark">
                <UserNav/>
              </Navbar>
            
              <AccountData/>
            </UpTheme>
            <NavFooter/>
          </Route>

          <Route path="/">
            <UpTheme>
              <Navbar bg="dark" variant="dark">
                <InfoNav/>
              </Navbar>
              <LoginForm logged={localStorage.getItem('token') !== undefined && true}/>
            </UpTheme>
            <NavFooter/>
          </Route>

        </Switch>
      </Router>
    </>
  );
}

// footer for every single page
function NavFooter() {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <NavbarCollapse className='justify-content-end'>
        <Button className='btn' variant='link'href='mailto:work@johndao.dev?subject=I%20found%20a%20bug%20in%20your%20Up%20Bank%20App.'>Found a bug?</Button>
        <Button className='btn' variant='link'href='https://johndao.dev'>About me</Button>
      </NavbarCollapse>
    </Navbar>
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