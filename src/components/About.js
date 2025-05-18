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
      <h1 style={{paddingTop:'3%',paddingBottom:'3%'}}>Terms of Use</h1>

      <AboutDiv style={{textAlign:'left'}}>
        <p>
          By using this app you acknowledge and agree to the terms below.
          <strong>I do not actively or willingly collect any data on this personal project. You are welcome to explore the source code located on GitHub <a href="https://github.com/jnddao/upbank" target="_blank" rel="noreferrer">here</a>.</strong>
        </p>

        <ul>
          <li>
            Distributed under the <a href="https://github.com/jnddao/upbank/blob/main/LICENSE" target="_blank" rel="noreferrer">
            MIT&nbsp;Licence</a>.
          </li>
          <li>
            This app is a <strong>personal, experimental demo</strong>. Use it at your own risk.
            It is provided “AS IS”, without warranty of any kind, except to the extent
            that liability cannot be excluded under applicable law.
          </li>
          <li>
            Up® and the Up logo are trademarks of Bendigo and Adelaide Bank Ltd.
            All related names, marks and content remain their property. This project
            is unaffiliated and for personal, non-commercial use only.
          </li>
          <li>
            If you believe your Up API token has been compromised, revoke it and
            generate a new one in the Up app
            (<a href="https://api.up.com.au/getting_started" target="_blank" rel="noreferrer">
            instructions</a>).
          </li>
        </ul>
      </AboutDiv>
    </>
  );
}