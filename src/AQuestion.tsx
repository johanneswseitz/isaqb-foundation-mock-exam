import React, {JSX, useId} from "react";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {QuestionCard} from "./QuestionCard";

import {Markdown} from "./Markdown";


interface AQuestionProperties {
    question: String,
    answers: Array<any>,
    points: Number,
    showResults: boolean
}

export function AQuestion({question, answers, points, showResults}: AQuestionProperties) : JSX.Element {
    const id = useId()

    return <QuestionCard question={question}
                         answersElement={
                             <RadioGroup name={id}>
                                 {answers.map(answer => {
                                     return <FormControlLabel
                                         key={answer.option}
                                         value={answer.option}
                                         control={<Radio/>}
                                         className={
                                             showResults ? (answer.correct ?
                                                 'correctAnswer'
                                                 : 'wrongAnswer'): ''
                                         }
                                         label={<Markdown markdown={answer.option + ") " + answer.text}/>}/>;
                                 })}
                             </RadioGroup> }
                         points={points}
                         questionTypeName={"A-Frage: Wählen Sie eine Option"}/>
}