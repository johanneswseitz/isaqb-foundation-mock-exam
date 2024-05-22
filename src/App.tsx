import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AQuestion} from "./AQuestion";
import {Button, Container, CssBaseline, Grid} from "@mui/material";
import {PQuestion} from "./PQuestion";
import {KQuestion} from "./KQuestion";

function App() {
  return (
      <React.Fragment>
          <CssBaseline />

          <Grid container component="main" p={10} spacing={2}>

              <Grid item xs={12} >
                  <h2>iSQAB Mock Exam</h2>
              </Grid>

              <AQuestion question="How many definitions of “software architecture” exist?"
                         answers={[
                             {key: "a", answer: "Exactly one for all kinds of systems."},
                             {key: "b", answer: "One for every kind of software system (e.g. “embedded”, “real-time”, “decision support”, “web”, “batch”, …)."},
                             {key: "c", answer: "A dozen or more different definitions."}
                         ]}
                         correctAnswer="c" points={1}/>

              <PQuestion hint="Choose the three best aspects."
                         question="Which THREE of the following aspects are covered by the term “software architecture”?"
                         answers={[
                             {key: "a", answer: "Components"},
                             {key: "b", answer: "Cross-Cutting Concepts"},
                             {key: "c", answer: "(internal and external) Interfaces"},
                             {key: "d", answer: "Coding conventions"},
                             {key: "e", answer: "Hardware sizing"}
                         ]}
                         correctAnswers={["a", "b", "c"]} points={1}/>

              <PQuestion hint="Select the four best fitting answers."
                         question="Which FOUR of the following statements about (crosscutting) concepts are most appropriate?"
                         answers={[
                             {key: "a", answer: "Uniform usage of concepts reduces coupling between building blocks."},
                             {key: "b", answer: "The definition of appropriate concepts ensures the pattern compliance of the\n" +
                                     "architecture."},
                             {key: "c", answer: "Uniform exception handling can be achieved when architects agree with developers\n" +
                                     "upon a suitable concept prior to implementation."},
                             {key: "d", answer: "For each quality goal there should be an explicitly documented concept. Concepts are\n" +
                                     "a means to increase consistency."},
                             {key: "e", answer: "Concepts are a means to increase consistency."},
                             {key: "f", answer: "A concept can define constraints for the implementation of many building blocks."},
                             {key: "g", answer: "A concept might be implemented by a single building block."}
                         ]}
                         correctAnswers={["a", "b", "c"]} points={1}/>

              <KQuestion hint="Select “appropriate” or “not appropriate” for every line." question="In your project, three architects and seven developers are working on the documentation of the software
architecture. Which methods are appropriate in order to achieve a consistent and adequate
documentation, and which are not?" choices={["appropriate", "not appropriate"]} answers={[]} points={2}/>


          </Grid>
      </React.Fragment>
  );
}

export default App;
