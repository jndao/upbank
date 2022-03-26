/**
 * Contains all components relating to the about section
 */

// love upbank gif
import loveGif from '../assets/love.gif'

// about style paragraph div
import {AboutDiv} from '../styles/UpStyle';

/**
 * All the content required to show an about page!
 * @returns JSX element
 */
export function AboutContent() {
  return (
    <>
      <h1 style={{paddingTop: '3%'}}>About the app</h1>
      <AboutDiv>
          This is a project that I have wanted to do ever since I happened upon up bank, a subsidiary bank of Bendigo, quite a while ago. <br /><br />

          There were so many reasons as to why I actually decided to make this. In fact, I had dwelled on creating an app such as this around
          the november of 2019, when I first signed up for upbank and saw their&nbsp;
          <a className='hvr-bob' variant='link' href="https://up.com.au/tree/" rel="noreferrer" target="_blank">tree of up.</a> <br /><br />

          Up had yet to create their own website/webapp (at the time that I created this app) so it evidently became the main driving force to start and continually work on this project.

          Ultimately It took me a while to think about how I was going to make this as I felt I had yet to attain the frontend skills to create a tool such as this. But, after a long journey of learning React and some front end, 
          you are here now reading the
          'about the app' page!<br /><br />

          This app was created with React and Bootstrap-React customized with SASS. All of the components you see built here were created from scratch using these tools. This project is completely open source so feel 
          free to explore the repository&nbsp;
          <a className='hvr-bob' variant='link' href="https://github.com/jnddao/upbank" rel="noreferrer" target="_blank">here.</a> <br /><br />
          You can checkout more about me at my website&nbsp;
          <a className='hvr-bob' variant='link' href="https://johndao.dev" rel="noreferrer" target="_blank">here!</a> <br /><br />
          Thanks for reading and have a good one!<br /><br />
          <text className="text-muted">From John.</text><br /><br />
          <img src={loveGif} width='100' height='100' alt='love upbank animation'/>
      </AboutDiv>
    </>
  );
}

/**
 * All the content required to show an terms page!
 * @returns JSX element
 */
export function AboutTerms() {
  return (
    <>
      <h1 style={{paddingTop: '3%'}}>Terms of use</h1>
      <AboutDiv style={{textAlign: 'left'}}>
        <h5>About the functionality of the app and it's terms of use. By using this app, you understand and agree that: </h5> <br />
        <ul>
            <li>This app is a PERSONAL PROJECT and is not intended for commercial use. USE IT AT YOUR OWN RISK.</li>
            <li>This app stores your token locally (to your personal device), with it being deleted as you leave the tab. It retrives all data using a READ ONLY API.</li>
            <li>ALL of your financial data is limited to being stored in react state.</li>
            <li>You accept that this is experimental and a proof of concept (demo) and is intended to be used as such, meaning that it does not take any responsibility for any damages that may occur as a result of misuse.</li>
            <li>I DO NOT store or collect any of your financial information. If you feel as though your token has been compromised, you can regenerate a new one <a href="https://api.up.com.au/getting_started" rel="noreferrer" target="_blank">here.</a></li>
            <li>There is no warranty on this product.</li>
            <li>It is distributed under the MIT Licence. You can see it <a href="https://github.com/jnddao/upbank/blob/main/LICENSE" rel="noreferrer" target="_blank">here.</a></li>
            
        </ul>
      </AboutDiv>
    </>
  );
}