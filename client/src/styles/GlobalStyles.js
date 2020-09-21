import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import backgroundImg from '../images/texture-background.jpg';


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
      // background: linear-gradient(
      // to right top,
      // rgba(0, 0, 0, 0.85),
      // rgba(0, 0, 0, 0.85)
      // ),url('${backgroundImg}');
      // background-image: url('${backgroundImg}');
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      // background-position: left top;
      background-color: ${colors.black}
    }
    p {
      font-size: 14px;
    }
    header {
      width: 100%;
      min-height: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${colors.dark_grey};
    }
`;

export default GlobalStyles;