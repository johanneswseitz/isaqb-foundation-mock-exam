import {QuestionCard} from "./QuestionCard";
import React from "react";
import Grid from "@mui/material/Grid";
import {
    Checkbox,
    FormControlLabel,
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
    points: Number
}

export function KQuestion({hint, question, firstChoice, secondChoice, answers, points}: KQuestionParameters){
    return <QuestionCard question={question}
                         points={points}
                         questionTypeName={"K-Frage: " + hint}
                         answersElement={
                                 <Table sx={{ minWidth: 400 }} aria-label="simple table">
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
                                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                             >
                                                 <TableCell component="th" scope="row">
                                                     {answer.option})
                                                 </TableCell>
                                                 <TableCell>
                                                     {answer.text}
                                                 </TableCell>
                                                 <TableCell>
                                                    <Checkbox/>
                                                 </TableCell>
                                                 <TableCell>
                                                     <Checkbox/>
                                                 </TableCell>
                                             </TableRow>
                                         ))}
                                     </TableBody>
                                 </Table>
}
questionTypeExplanation='K-Questions (Allocation Questions, Choose Category): For a question, select the correct of the two
options for each answer choice ("correct" or "incorrect" or "applicable" or "not applicable"). You will receive
1/n of the points for each correctly placed cross. Incorrectly placed crosses result in the deduction of 1/n
of the points. If NO answer is selected in a line, there are neither points nor deductions.'></QuestionCard>

}