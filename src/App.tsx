import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import {AQuestion} from "./AQuestion";
import {Box, Button, Card, CardContent, Chip, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import Stack from '@mui/material/Stack';
import {CheckCircle, Cancel} from '@mui/icons-material';


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
    const [individualQuestionPoints, setIndividualQuestionPoints] = useState(new Map<string, number>());
    const [score, setScore] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [isPassed, setIsPassed] = useState(false);

    useEffect(() => {
        axios.get("./questions_de.json").then((res) => {
            setQuestions(res.data);
            let reduce = res.data.map((question: any) => Number(question.points)).reduce((a: number, b: number) => a + b, 0);
            console.log(reduce)
            setTotalPoints(reduce)
        });
    }, []);

    useEffect(() => {
        let sum = Array.from(individualQuestionPoints.values()).reduce((a, b) => a+b, 0);
        setScore(sum);
        setIsPassed(sum >= totalPoints*0.6)
    }, [individualQuestionPoints]);

    function onPointsChange(questionId:string, points: number) {
        setIndividualQuestionPoints((m) => {
            const newMap = new Map(m);
            newMap.set(questionId, Number(points));
            return newMap;
        });
    }

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
                              questionId={question.id}
                              hint={question.instruction}
                              question={question.question}
                              answers={question.answers}
                              totalPoints={question.points}
                              showResults={showResults}
                              onPointsChange={onPointsChange}/>
                      } else if (question.type === "A-Frage"){
                          return <AQuestion
                              key={question.id}
                              questionId={question.id}
                              question={question.question}
                              answers={question.answers}
                              totalPoints={question.points}
                              showResults={showResults}
                              onPointsChange={onPointsChange}/>
                      } else if (question.type === "K-Frage") {
                          return <KQuestion
                              key={question.id}
                              questionId={question.id}
                              hint={question.instruction}
                              question={question.question}
                              firstChoice={question.first_choice}
                              secondChoice={question.second_choice}
                              answers={question.answers}
                              totalPoints={question.points}
                              onPointsChange={onPointsChange}
                              showResults={showResults}/>
                      } else {
                          return <h3>Unknown question Type! {question.type}</h3>
                      }
              }
              )}
              <Button variant="contained" onClick={()=> setShowResults(true)}>Auswerten</Button>
              <Box sx={{opacity: showResults ? 1 : 0,
                  transform: showResults ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'opacity 1s ease, transform 1s ease',
                  visibility: showResults ? 'visible' : 'hidden', // helps with accessibility and hides the element visually
              }}>
                  <Card
                      sx={{
                          maxWidth: 350,
                          mx: 'auto',
                          my: 2,
                          p: 3,
                          background: `linear-gradient(145deg, ${isPassed ? '#e0ffe0' : '#ffe0e0'}, #ffffff)`,
                          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                          borderRadius: 4,
                          textAlign: 'center',
                      }}
                  >
                      <CardContent>
                          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
                              Score
                          </Typography>
                          <Typography variant="h3" component="div" sx={{ color: isPassed ? '#4caf50' : '#f44336', mb: 2 }}>
                              {showResults ? score.toFixed(2) : "?"}&nbsp;/&nbsp;
                              {totalPoints}
                          </Typography>

                          <Box display="flex" justifyContent="center" mt={3}>
                              <Chip
                                  label={showResults? (isPassed ? 'Pass' : 'Fail') : "?"}
                                  color={isPassed ? 'success' : 'error'}
                                  icon={isPassed ? <CheckCircle /> : <Cancel />}
                                  sx={{
                                      fontSize: '1rem',
                                      fontWeight: 'bold',
                                      padding: '10px 20px',
                                  }}
                              />
                          </Box>
                      </CardContent>
                  </Card>
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
