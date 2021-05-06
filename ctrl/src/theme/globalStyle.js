import { createGlobalStyle, css } from 'styled-components';
import { darkPalette } from './palette';

export const SCROLLBAR_WEIGHT = '6px';

export const animations = {
  fadeIn: 'fadeIn',
};

export const coreGlobalStyle = css`
  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .App {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
  }

  @supports (-webkit-overflow-scrolling: touch) {
    /* Fix on click outside functionality on iOS devices */
    body {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .ie11-fix {
      margin-top: 100px;
    }
  }

  * {
    box-sizing: border-box;
    outline: none;
    font-variant-ligatures: none;
  }

  ::-webkit-scrollbar {
    width: ${SCROLLBAR_WEIGHT};
    height: ${SCROLLBAR_WEIGHT};
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${darkPalette.background.paper};
    border-radius: 4px;
    &:hover {
      background-color: ${darkPalette.background.paper};
    }
  }

  @keyframes ${animations.fadeIn} {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${coreGlobalStyle}
`;

export default GlobalStyle;
