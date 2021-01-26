import styled from "styled-components";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Widget from "../src/components/Widget";
import db from "../db.json";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const theme = db.theme;

const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <BackgroundImage>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>É o Blindas</h1>
            </Widget.Header>
            <Widget.Content>
              <p>vai brincando...</p>
            </Widget.Content>
          </Widget>
        </QuizContainer>
      </BackgroundImage>
    </>
  );
}
