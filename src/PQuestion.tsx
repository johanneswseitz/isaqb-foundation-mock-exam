import React, {JSX, useId} from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
    Box,
    Card,
    CardActions,
    CardContent, Checkbox,
    FormControlLabel, FormGroup,
    Grid,
    Radio,
    RadioGroup,
    Tooltip,
    Typography
} from "@mui/material";
import {QuestionCard} from "./QuestionCard";
import {Markdown} from "./App";

interface Answer {
    key: String,
    answer: String
}

interface PQuestionProperties {
    hint: String,
    question: String,
    answers: Array<any>,
    points: Number
}

export function PQuestion({hint, question, answers, points}: PQuestionProperties) : JSX.Element {
    const id = useId();

    return <QuestionCard question={question}
                         answersElement={
                             <FormGroup>
                                 {answers.map(answer => (
                                     <FormControlLabel value={ answer.option } control={<Checkbox />}
                                                       label={<Markdown markdown={answer.option + ") " + answer.text}/>} />
                                 ))}
                             </FormGroup> }
                         points={points}
                         questionTypeName={"P-Frage: " + hint}
                         questionTypeExplanation="P-Questions (Pick-from-many, Pick Multiple): Select the number of correct answers given in the text from
the list of possible answers to a question. Select just as many answers as are required in the introductory
text. You receive 1/n of the total points for each correct answer. For each incorrect cross, 1/n of the points
are deducted."/>
}