/**
 * Contains all components relating to the about section
 */

import loveGif from '../assets/love.gif'

import {AboutDiv} from '../styles/UpStyle';
import FadeIn from 'react-fade-in';


export function AboutContent() {
    return (
        <>
            <h1 style={{paddingTop: '3%'}}>About the app</h1>
            <AboutDiv style={{}}>
                This is a project that I have wanted to do ever since I happened upon up bank quite a while ago. <br /><br />

                There were so many reasons as to why I actually decided to make this. In fact, I had dwelled on creating an app such as this around
                the november of 2019, when I first signed up for upbank and saw their&nbsp;
                <a className='hvr-bob' variant='link' href="https://up.com.au/tree/" rel="noreferrer" target="_blank">tree of up.</a> <br /><br />

                Up had yet to create their own website/webapp (at the time that I created this app) so it evidently became the main driving force to start and continually work on this project.

                Ultimately It took me a while to create this as I felt I had yet to attain the frontend skills to create a tool such as this. But, after a long while, 
                you are here now reading the
                'about the app' page!<br /><br />

                This app was created with React and Bootstrap-React customized with SASS. This project is completely open source so feel 
                free to explore the repository of the standalone version&nbsp;
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