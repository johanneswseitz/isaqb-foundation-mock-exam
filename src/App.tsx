import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import {AQuestion} from "./AQuestion";
import {Box, Button, CssBaseline, Divider, ThemeProvider, Typography} from "@mui/material";
import Stack from '@mui/material/Stack';


import {PQuestion} from "./PQuestion";
import {KQuestion} from "./KQuestion";
import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    spacing: 3,
    palette: {
        primary: {
            light: '#BFCFD4',
            main: '#40707E',
            dark: '#004153',
            contrastText: '#fff',
        },
        secondary: {
            light: '#FFE6D9',
            main: '#FFB58C',
            dark: '#FF9C66',
            contrastText: '#000',
        },
    },
});

function App() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        axios.get("./questions_de.json").then((res) => {

            setQuestions(res.data);
        });
    }, []);

    return (
      <React.Fragment>
          <CssBaseline />

          <ThemeProvider theme={theme}>

          <Stack direction="column" spacing={10}   justifyContent="center"
                 alignItems="center"
          >
              <Typography variant="h2" component="h1" >
                  CPSA-F Musterprüfung
              </Typography>

              {questions &&
                  questions.map(function(question:any)  {
                      if (question.type === "P-Frage"){
                          return <PQuestion hint={question.instruction} question={question.question}
                                            answers={question.answers}  points={question.points}/>
                      } else if (question.type === "A-Frage"){
                          return <AQuestion question={question.question} answers={question.answers}  points={question.points} />
                      } else if (question.type === "K-Frage") {
                          return <KQuestion hint={question.instruction} question={question.question}
                                            firstChoice={question.first_choice} secondChoice={question.second_choice}
                                            answers={question.answers} points={question.points}/>
                      } else {
                          return <h3>Unknown question Type! {question.type}</h3>
                      }
              }
              )}
              <Box>
                  <Button variant="contained">Auswerten</Button>
              </Box>
          </Stack>
          </ThemeProvider>
      </React.Fragment>
  );
}

function convertMarkdownToHtml(markdown:String) {
    const boldRegex = /(\*\*|__)(.*?)\1/g;
    let html = markdown.replace(boldRegex, '<strong>$2</strong>');
    const italicRegex = /(\*|_)(.*?)\1/g;
    html = html.replace(italicRegex, '<em>$2</em>');
    const nbspRegex = /\{nbsp\}/;
    html = html.replace(nbspRegex, "\u00A0");
    return html;
}

export const Markdown = ( markdown : any) => {
    const createMarkup = () => {
        return { __html: convertMarkdownToHtml(markdown.markdown) };
    };

    return <div dangerouslySetInnerHTML={createMarkup()} />;
};

export default App;
