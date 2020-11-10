import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import backgroundImg from '../images/background.png';


const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: black;
        font-family: 'Raleway', sans-serif;
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

    #root {
      background: linear-gradient(
      to right top,
      ${colors.black_trans},
      ${colors.black_trans}
      ),url('${backgroundImg}');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: left top;
    }
    p {
      font-size: 14px;
    }
    main {
      width: 100%;
    }
    header,
    footer {
      width: 100%;
      display: flex;
      padding: 10px;
    }
    footer {
      justify-content: center;
      align-items: center;
    }
    header {
      background-color: ${colors.dark_grey};
      p {
        font-size: 1.25rem;
        color: ${colors.blue};
      }
    }
    button {
      background: none;
	    color: inherit;
	    border: none;
	    padding: 0;
	    font: inherit;
	    cursor: pointer;
	    outline: inherit;
    }
    h1 {
      color: ${colors.blue};
    }
`;

export default GlobalStyles;