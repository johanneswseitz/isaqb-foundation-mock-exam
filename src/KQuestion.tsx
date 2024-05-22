import {QuestionCard} from "./QuestionCard";
import React from "react";
import Grid from "@mui/material/Grid";
import {Checkbox, FormControlLabel} from "@mui/material";

interface Answer {
    key: String,
    answer: String
}

interface KQuestionParameters {
    hint: String,
    question: String,
    choices: Array<String>,
    answers: Array<Answer>,
    points: Number
}

export function KQuestion({hint, question, choices, answers, points}: KQuestionParameters){
    return <QuestionCard question={question}
                         points={points}
                         questionTypeName={"K-Question: " + hint}
                         answersElement={
                             <Grid container spacing={2}>
                                 {choices.map((choice) =>
                                         <Grid item xs={2}>
                                             {choice}
                                         </Grid>
                                     )
                                 }
                                 <Grid item xs={12}>
                                 </Grid>
                                 {answers.map((answer) =>
                                     <>
                                         <Grid item xs={2}>
                                             <Checkbox />
                                         </Grid>
                                         <Grid item xs={2}>
                                             <Checkbox />
                                             <FormControlLabel value={ answer.key } control={<Checkbox />} label={answer.key + ") " + answer.answer} />
                                         </Grid>
                                     </>
                             )
                         }
</Grid>
}
questionTypeExplanation='K-Questions (Allocation Questions, Choose Category): For a question, select the correct of the two
options for each answer choice ("correct" or "incorrect" or "applicable" or "not applicable"). You will receive
1/n of the points for each correctly placed cross. Incorrectly placed crosses result in the deduction of 1/n
of the points. If NO answer is selected in a line, there are neither points nor deductions.'></QuestionCard>

}