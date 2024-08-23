import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import {AQuestion} from "./AQuestion";
import {Box, Button, CssBaseline, ThemeProvider, Typography} from "@mui/material";
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
    const [questions, setQuestions] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);

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
                          return <PQuestion
                              key={question.id}
                              hint={question.instruction}
                              question={question.question}
                              answers={question.answers}
                              totalPoints={question.points}
                              showResults={showResults}/>
                      } else if (question.type === "A-Frage"){
                          return <AQuestion
                              key={question.id}
                              question={question.question}
                              answers={question.answers}
                              totalPoints={question.points}
                              showResults={showResults}/>
                      } else if (question.type === "K-Frage") {
                          return <KQuestion
                              key={question.id}
                              hint={question.instruction}
                              question={question.question}
                              firstChoice={question.first_choice}
                              secondChoice={question.second_choice}
                              answers={question.answers}
                              totalPoints={question.points}
                              showResults={showResults}/>
                      } else {
                          return <h3>Unknown question Type! {question.type}</h3>
                      }
              }
              )}
              <Box>
                  <Button variant="contained" onClick={()=> setShowResults(true)}>Auswerten</Button>
              </Box>
          </Stack>
          <Box component="section" sx={{ width: "100%", padding: 20, textAlign: "center"}}>
              Application created by <a href="https://www.innoq.com">INNOQ</a>.
              Questions by <a href="https://github.com/isaqb-org/examination-foundation/">iSAQB</a>.
          </Box>
          </ThemeProvider>
      </React.Fragment>
  );
}

export default App;
