import React, {JSX, useEffect, useId, useState} from "react";
import {
    Checkbox,
    FormControlLabel, FormGroup,
} from "@mui/material";
import {QuestionCard} from "./QuestionCard";

import {Markdown} from "./Markdown";

interface PQuestionProperties {
    questionId: string,
    hint: string,
    question: string,
    answers: any[],
    totalPoints: number,
    showResults: boolean,
    onPointsChange: Function
}

export function PQuestion({
                              questionId,
                              hint,
                              question,
                              answers,
                              totalPoints,
                              showResults,
                              onPointsChange,
                          }: PQuestionProperties): JSX.Element {
    const id = useId();
    const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
    const [actualPoints, setActualPoints] = useState<number>(0);

    const handleChoiceChange = (option: string) => {
        setSelectedChoices((prevSelected: any) => {
            if (prevSelected.includes(option)) {
                return prevSelected.filter((i: string) => i !== option);
            } else {
                return [...prevSelected, option];
            }
        });
    };

    useEffect(() => {
        let number = calculatePoints(selectedChoices);
        setActualPoints(() => number);
    }, [selectedChoices]);

    useEffect(() => {
        onPointsChange(questionId, actualPoints);
    }, [actualPoints]);

    const calculatePoints = (selectedChoices: any) => {
        const correctAnswers = answers.filter((answer: any) => answer.correct);
        if (selectedChoices.length > correctAnswers.length) return 0;

        let correctOptions: string[] = correctAnswers.map((answer) => answer.option);

        let correctlySelected = selectedChoices.filter((choice: string) => correctOptions.includes(choice));
        let wronglySelected = selectedChoices.filter((choice: string) => !correctOptions.includes(choice));

        let bonus = correctlySelected.length * (1 / correctAnswers.length * totalPoints);
        let malus = wronglySelected.length * (1 / correctAnswers.length * totalPoints);

        let finalPoints = bonus - malus;
        return (finalPoints < 0) ? 0 : finalPoints;
    }

    return <QuestionCard question={question}
                         answersElement={
                             <FormGroup>
                                 {answers.map(answer => (
                                     <FormControlLabel
                                         style={{marginLeft: 0, marginRight: 0}}
                                         key={answer.option}
                                         value={answer.option}
                                         control={<Checkbox
                                             onChange={() => handleChoiceChange(answer.option)}/>}
                                         checked={selectedChoices.includes(answer.option)}
                                         className={
                                             showResults ? (answer.correct ?
                                                 'correctAnswer'
                                                 : 'wrongAnswer') : ''
                                         }
                                         label={<Markdown
                                             markdown={answer.option + ") " + answer.text}/>}/>
                                 ))}
                             </FormGroup>}
                         actualPoints={actualPoints}
                         totalPoints={totalPoints}
                         questionTypeName={"P-Frage: " + hint}
                         showResults={showResults}
    />
}