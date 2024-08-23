import {QuestionCard} from "./QuestionCard";
import React, {useEffect, useState} from "react";
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";


interface KQuestionParameters {
    hint: string,
    question: string,
    firstChoice: string,
    secondChoice: string,
    answers: any[],
    totalPoints: number,
    showResults: boolean
}

interface SelectedCheckbox {
    option: string,
    checkbox: string
}

export function KQuestion({hint, question, firstChoice, secondChoice,
                              answers, totalPoints, showResults}: KQuestionParameters) {

    const [selectedChoices, setSelectedChoices] = useState<SelectedCheckbox[]>([]);
    const [actualPoints, setActualPoints] = useState<number>(0);

    function selectionChanged(option: string, checkbox: string) {
        setSelectedChoices((prevSelected: SelectedCheckbox[]) => {
            let selectedCheckbox = {option, checkbox};
            let found = typeof prevSelected.find((element) => {
                return element.checkbox === checkbox && element.option === option;
            }) !== "undefined";
            if (found) {
                return prevSelected.filter((i: SelectedCheckbox) => i.option !== option || i.checkbox !== checkbox);
            } else {
                return [...prevSelected, selectedCheckbox];
            }
        });
    }

    useEffect(() => {
        setActualPoints(calculatePoints(selectedChoices));
    }, [selectedChoices]);

    const calculatePoints = (selectedChoices: SelectedCheckbox[]) => {
        let points = selectedChoices.map(selectedChoice => answers
            .filter(answer => answer.option === selectedChoice.option)
            .map((answer: any) => selectedChoice.checkbox === "first" ? answer.first_correct : answer.second_correct)
            .map((isCorrect: boolean) => isCorrect ?
                (1/answers.length) * totalPoints
                : -(1/answers.length) * totalPoints))
            .flat()
            .reduce((a:any ,b:any)=> a + b, 0);
        return Math.max(0, points);
    }

    return <QuestionCard question={question}
                         actualPoints={actualPoints}
                         totalPoints={totalPoints}
                         showResults={showResults}
                         questionTypeName={"K-Frage: " + hint}
                         answersElement={
                             <Table sx={{minWidth: 400}} aria-label="simple table">
                                 <TableHead>
                                     <TableRow>
                                         <TableCell style={{fontSize: "16px"}}>Frage</TableCell>
                                         <TableCell style={{fontSize: "16px"}}>Beschreibung</TableCell>
                                         <TableCell style={{fontSize: "16px"}}>{firstChoice}</TableCell>
                                         <TableCell style={{fontSize: "16px"}}>{secondChoice}</TableCell>
                                     </TableRow>
                                 </TableHead>
                                 <TableBody>
                                     {answers.map((answer) => (
                                         <TableRow
                                             key={answer.option}
                                             sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                         >
                                             <TableCell component="th" scope="row" style={{fontSize: "16px"}}>
                                                 {answer.option})
                                             </TableCell>
                                             <TableCell style={{fontSize: "16px"}}>
                                                 {answer.text}
                                             </TableCell>
                                             <TableCell className={
                                                 showResults ? (answer.first_correct ?
                                                     'correctAnswer'
                                                     : 'wrongAnswer') : ''
                                             }>
                                                 <Checkbox onChange={() => selectionChanged(answer.option, "first")}/>
                                             </TableCell>
                                             <TableCell
                                                 className={
                                                     showResults ? (answer.second_correct ?
                                                         'correctAnswer'
                                                         : 'wrongAnswer') : ''
                                                 }>
                                                 <Checkbox onChange={() => selectionChanged(answer.option, "second")}/>
                                             </TableCell>
                                         </TableRow>
                                     ))}
                                 </TableBody>
                             </Table>
                         }/>

}