/**
 * All styles for upbank app
 */
import styled from 'styled-components';

export const UpTheme = styled.div `
    min-height: 100vh;
    width: 100%;
    background-color: #1A1A22;
    color: #FF7A64;
    text-align: center;
`;

export const UpLogin = styled.div `
    margin: auto;
    width: 60%;
    padding: 15% 0;
    text-align: left;
`;

export const AccountContainer = styled.div `
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    flex-wrap: wrap;
    width: 60%;
    padding-bottom: 4%;
`;

export const AccountCard = styled.div `
    margin-top: 2%;
    margin-bottom: 20%;
    transition: 0.5s;
    color: white;
    text-align: left;
    opacity: 0.8;

    &:hover {
        cursor: pointer; 
        opacity: 1;
    }
`;

export const AboutDiv = styled.div `
    margin: auto;
    margin-top: 3%; 
    width: 80%; 
    color: #FFF06B;
    letter-spacing: 1.5px;
    line-height: 200%;
    font-size: large;
    padding-bottom: 15%;
    &:hover {
        cursor: cursor;
    }
`;