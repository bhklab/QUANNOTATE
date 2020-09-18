import { createGlobalStyle } from 'styled-components';
import colors from './colors';


const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: black;
        // font-family: 'Raleway', sans-serif;
        &:hover {
        cursor: pointer !important;
        }
    }
    ul {
        padding: 0;
        list-style: none;
    }
    ol {
        list-style: none;
        counter-reset: my-awesome-counter;
    }
    
    li {
        text-decoration: none;
    }
`;

export default GlobalStyles;