// react imports
import {
    //BrowserRouter as Router, // commented out as it doesn't work on github pages
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import FadeIn from 'react-fade-in';


// bootstrap styles
import { Button, Container, Navbar, Row , Col} from 'react-bootstrap';
// Up components
import {LoginForm, AccountData, RecentData} from './Up.js';
import {AboutContent, AboutTerms} from './About.js';

// The general theme of the app
import {UpTheme, MainContent} from '../styles/UpStyle.js';
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
          <Route exact path="/terms" component={Terms}/>
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
        <MainContent><FadeIn><AboutContent /></FadeIn></MainContent>
        <NavFooter/>
      </UpTheme>
    </>
    
  );
}

// Main about page component
function Terms() {
  return (
    <>
      <UpTheme>
        <Navbar bg="dark" variant="dark">
          <InfoNav/>
          </Navbar>
          <MainContent><FadeIn><AboutTerms /></FadeIn></MainContent>
        <NavFooter/>
      </UpTheme>
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
        <MainContent>
          <FadeIn>
            <h1 style={{paddingTop: "3%"}}>Welcome!</h1>
            <h5 style={{paddingBottom: "3%"}}> You're Logged In!</h5>
          </FadeIn>
          <Container>
            <Row>
              <Col>
                <div style={{padding: "1%"}}>
                  <AccountData/>
                </div>
              </Col>
              <Col>
                <RecentData />
              </Col>
            </Row>
          </Container>
        </MainContent>
        <NavFooter/>
      </UpTheme>
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
        <MainContent>
          <FadeIn><LoginForm logged={sessionStorage.getItem('token') !== undefined && true}/></FadeIn>
        </MainContent>
        <NavFooter/>
      </UpTheme>
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
        <MainContent>
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
        </MainContent>
        <NavFooter/>
      </UpTheme>
    </>
  )
}

// footer for every single page
function NavFooter() {
  return (
    <Navbar bg="dark" variant="dark">
      <NavbarCollapse className='justify-content-end'>
        <Button className='btn' variant='link'href='https://github.com/jnddao/upbank'>Github</Button>
        <Button className='btn' variant='link'href='https://johndao.com/contact?message=Hi+there%2C%0D%0AI+found+a+bug+in+your+UpBank+app+%3A%28%0D%0A'>Found a bug?</Button>
        <Button className='btn' variant='link'><Link to='/terms'>Terms of use</Link></Button>
        <Button className='btn' variant='link'href='https://johndao.com'>About me</Button>
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
        <HomeNav/> <AboutNav/> <LoginNav/>
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
    <Navbar className="navbar-light bg-light" style={{ paddingTop: '0.4rem', paddingBottom: '0.4rem' }}>
      <Navbar.Brand href="/" /* override the nowrap */ style={{ whiteSpace: 'normal' }}>
        {/* logo */}
        <img
          src={coolUpLogo}
          width="40"
          height="40"
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
          alt="Upbank logo"
        />

        {/* banner text — inline-block so it wraps; margin for breathing room */}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            marginLeft: 8,
            lineHeight: 1.2,
            fontSize: '0.75rem',
            color: '#6c757d', // muted
          }}
        >
          This project will be archived and decomissioned in the coming weeks. 
          I haven't had the time to maintain this project to the standards that I find acceptable. 
          It may be restarted in the future as I continue to enjoy using Up Bank. 
          The code should continue to be available once decomissioned unless noted otherwise.
        </span>
      </Navbar.Brand>
    </Navbar>
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

// Button to go login page
// will show as logout button if user is already logged in
function LoginNav() {
  if (sessionStorage.getItem('token') === null) {
    return (
      <Link className='mr-2 btn btn-primary' to='/login'>Login</Link>
    );
  } else {
    return (
      <LogOut/>
    );
  }

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