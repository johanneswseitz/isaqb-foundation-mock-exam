import React, {JSX, useId, useState} from "react";
import {
    Checkbox,
    FormControlLabel, FormGroup,
} from "@mui/material";
import {QuestionCard} from "./QuestionCard";

import {Markdown} from "./Markdown";

interface PQuestionProperties {
    hint: String,
    question: String,
    answers: Array<any>,
    points: Number,
    showResults: boolean
}

export function PQuestion({hint, question, answers, points, showResults}: PQuestionProperties) : JSX.Element {
    const id = useId();
    const [selectedChoices, setSelectedChoices] = useState<String[]>([]);

    const handleChoiceChange = (option: String) => {
        setSelectedChoices((prevSelected: any) => {
            if (prevSelected.includes(option)) {
                return prevSelected.filter((i: String) => i !== option);
            } else {
                return [...prevSelected, option];
            }
        });
    };

    return <QuestionCard question={question}
                         answersElement={
                             <FormGroup>
                                 {answers.map(answer => (
                                     <FormControlLabel
                                         key={answer.option}
                                         value={answer.option}
                                         control={<Checkbox
                                             onChange={() => handleChoiceChange(answer.option)}/>}
                                         checked={selectedChoices.includes(answer.option)}
                                         className={
                                             showResults ? (answer.correct ?
                                                 'correctAnswer'
                                                 : 'wrongAnswer'): ''
                                         }
                                         label={<Markdown
                                             markdown={answer.option + ") " + answer.text}/>}/>
                                 ))}
                             </FormGroup>}
                         points={points}
                         questionTypeName={"P-Frage: " + hint}/>
}