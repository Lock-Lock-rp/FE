import { Global, css } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={css`
      @import url('https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background: #f6f6f6;
        font-family: 'Pretendard', sans-serif;
      }
    `}
  />
);

export default GlobalStyle;
