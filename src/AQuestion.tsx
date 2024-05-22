import React, {JSX, useId} from "react";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {QuestionCard} from "./QuestionCard";

interface Answer {
    key: String,
    answer: String
}

interface AQuestionProperties {
    question: String,
    answers: Array<Answer>,
    correctAnswer: String,
    points: Number
}

export function AQuestion({question, answers, correctAnswer, points}: AQuestionProperties) : JSX.Element {
    const id = useId()

    function scoreQuestion(){
        let checkedBox : HTMLInputElement | null = document.querySelector("input[name='" + id + "']:checked");
        if (checkedBox === null || checkedBox.value !== correctAnswer)
            return 0
        else
            return points;
    }

    return <QuestionCard question={question}
                         answersElement={
                             <RadioGroup name={id}>
                                 {answers.map(answer => {
                                     return <FormControlLabel value={answer.key} control={<Radio/>} onChange={scoreQuestion}
                                                              label={answer.key + ") " + answer.answer}/>;
                                 })}
                             </RadioGroup> }
                         points={points}
                         questionTypeName={"A-Question: Select one option"}
                         questionTypeExplanation="A-Question: (Single Choice, Single Correct Answer). Select the only correct answer to a question from
the list of possible answers. There is only one correct answer. You receive the specified score for selecting
the correct answer."/>
}