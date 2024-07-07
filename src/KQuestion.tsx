import {QuestionCard} from "./QuestionCard";
import React from "react";
import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";


interface KQuestionParameters {
    hint: String,
    question: String,
    firstChoice: String,
    secondChoice: String,
    answers: Array<any>,
    points: Number,
    showResults: boolean
}

export function KQuestion({hint, question, firstChoice, secondChoice, answers, points, showResults}: KQuestionParameters){
    return <QuestionCard question={question}
    points={points}
    questionTypeName={"K-Frage: " + hint}
    answersElement={
        <Table sx={{minWidth: 400}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Frage</TableCell>
                    <TableCell>Beschreibung</TableCell>
                    <TableCell>{firstChoice}</TableCell>
                    <TableCell>{secondChoice}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {answers.map((answer) => (
                    <TableRow
                        key={answer.option}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            {answer.option})
                        </TableCell>
                        <TableCell>
                            {answer.text}
                        </TableCell>
                        <TableCell className={
                            showResults ? (answer.first_correct ?
                                'correctAnswer'
                                : 'wrongAnswer') : ''
                        }>
                            <Checkbox/>
                        </TableCell>
                        <TableCell
                            className={
                                showResults ? (answer.second_correct ?
                                    'correctAnswer'
                                    : 'wrongAnswer') : ''
                            }>
                            <Checkbox/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    }/>

}