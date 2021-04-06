// react imports
import {
    //BrowserRouter as Router, // commented out as it doesn't work on github pages
    HashRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import FadeIn from 'react-fade-in';


// bootstrap styles
import { Button, Navbar } from 'react-bootstrap';
// Up components
import {LoginForm, AccountData} from './Up.js';
import {AboutContent} from './About.js';

// The general theme of the app
import {UpTheme} from '../styles/UpStyle.js';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

// images
import coolUpLogo from '../assets/logo.gif';
import fearImage from '../assets/fear.svg';

/**
 * A router to navigate through react app
 * @returns A navbar Router
 */
export function AppRouter() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/about" component={About}/>
          <Route exact path ="/accounts" component={Accounts}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/"><Redirect to="/login"/></Route>
          <Route component={NotFound}/>
            
        </Switch>
      </Router>
    </>
  );
}

// Main about page component
function About() {
  return (
    <>
      <UpTheme>
        <Navbar bg="dark" variant="dark">
          <InfoNav/>
          </Navbar>
          <FadeIn></FadeIn><AboutContent />
        </UpTheme>
      <NavFooter/>
    </>
    
  );
}
// Main Account page component
function Accounts() {
  return (
    <>
      <UpTheme>
        <Navbar bg="dark" variant="dark">
          <UserNav/>
        </Navbar>
        <h1 style={{paddingTop: "3%"}}>Welcome!</h1>
        <h5>You're Logged In!</h5>
        <div style={{padding: "1%"}}>
          <AccountData/>
        </div>
      </UpTheme>
      <NavFooter/>
    </>
  );
}

// main login page component
function Login() {
  return (
    <>
      <UpTheme>
        <Navbar bg="dark" variant="dark">
          <InfoNav/>
        </Navbar>
        <FadeIn><LoginForm logged={sessionStorage.getItem('token') !== undefined && true}/></FadeIn>
      </UpTheme>
      <NavFooter/>
    </>
  );
}

// main 404 not found component
function NotFound() {
  return (
    <>
      <UpTheme>
        <Navbar bg="dark" variant="dark">
          <InfoNav/>
        </Navbar>
        <FadeIn >
          <div style={{paddingTop: '5%', paddingBottom: '2%'}}>
            <h1>Uh Oh!</h1>
            <h3 >Page doesn't exist.</h3>
            <img
              src={fearImage}
              width="100"
              height="100"
              className="d-inline-block align-top"
              alt="Oh No Emoji"
          />
          </div>
          <HomeNav/>
          
        </FadeIn>
      </UpTheme>
      <NavFooter/>
    </>
  )
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

/*

  Main components that make up the navigation and pages

*/

// when you're not logged in
function InfoNav() {
  return (
    <>
      <Header/>
      <NavbarCollapse className='justify-content-end'>
        <HomeNav/> <AboutNav/>
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
        <HomeNav/> <AboutNav/> <LogOut/>
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
            src={coolUpLogo}
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
  const [logOut, setLogOut] = useState(sessionStorage.getItem('token') === null);

  const handleLogOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('token');
    setLogOut(true);
  }

  // returns a button. Redirects automatically if already logged out 
  // (like someone tries to access /accounts)
  return (
    <>
      <div> { logOut && <Redirect to="/login"/> }</div>
      <Button className='mr-2 btn btn-secondary' onClick={handleLogOut}>Log Out</Button>
    </>
  );
}

// button to go to About
function AboutNav() {
  return (
    <Link className='mr-2 btn btn-primary' to='/about'>About</Link>
  );
}
// button to go to Home
function HomeNav() {
  return (
    <Link className='mr-2 btn btn-primary' to='/'>Home</Link>
  );
}