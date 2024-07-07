import React, {JSX, useId} from "react";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {QuestionCard} from "./QuestionCard";
import {Markdown} from "./App";


interface AQuestionProperties {
    question: String,
    answers: Array<any>,
    points: Number
}

export function AQuestion({question, answers, points}: AQuestionProperties) : JSX.Element {
    const id = useId()

    function scoreQuestion(){
        let checkedBox : HTMLInputElement | null = document.querySelector("input[name='" + id + "']:checked");
            return points;
    }

    return <QuestionCard question={question}
                         answersElement={
                             <RadioGroup name={id}>
                                 {answers.map(answer => {
                                     return <FormControlLabel value={answer.option} control={<Radio/>} onChange={scoreQuestion}
                                                              label={<Markdown markdown={answer.option + ") " + answer.text}/>}/>;
                                 })}
                             </RadioGroup> }
                         points={points}
                         questionTypeName={"A-Frage: Wählen Sie eine Option"}
                         questionTypeExplanation="A-Question: (Single Choice, Single Correct Answer). Select the only correct answer to a question from
the list of possible answers. There is only one correct answer. You receive the specified score for selecting
the correct answer."/>
}