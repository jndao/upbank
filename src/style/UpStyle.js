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
    width: 80%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const AccountCard = styled.div `
    margin-top: 15%;
    transition: 0.5s;
    color: white;
    text-align: left;
    &:hover {
        cursor: pointer; 
        transform: scale(1.3);
    }
`;
