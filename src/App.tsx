import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import {AQuestion} from "./AQuestion";
import {Button, Container, CssBaseline, Grid} from "@mui/material";
import {PQuestion} from "./PQuestion";
import {KQuestion} from "./KQuestion";

function App() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        axios.get("/questions_de.json").then((res) => {

            setQuestions(res.data);
        });
    }, []);

    return (
      <React.Fragment>
          <CssBaseline />

          <Grid container component="main" p={10} spacing={2}>

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
          </Grid>
      </React.Fragment>
  );
}

export default App;
