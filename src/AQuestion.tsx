import React, {JSX, useEffect, useId, useState} from "react";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {QuestionCard} from "./QuestionCard";

import {Markdown} from "./Markdown";


interface AQuestionProperties {
    question: string,
    answers: any[],
    totalPoints: number,
    showResults: boolean
}

export function AQuestion({question, answers, totalPoints, showResults}: AQuestionProperties) : JSX.Element {
    const id = useId()
    const [selectedChoice, setSelectedChoice] = useState<string[]>([]);
    const [actualPoints, setActualPoints] = useState<number>(0);

    const handleChoiceChange = (option: string) => {
        setSelectedChoice((prevSelected: string[]) => {
            if (prevSelected.includes(option)) {
                return [];
            } else {
                return [option];
            }
        });
    };

    useEffect(() => {
        let correctChoice = answers.find((choice) => choice.correct);
        if (selectedChoice.includes(correctChoice.option)){
            setActualPoints(totalPoints);
        } else {
            setActualPoints(0);
        }
    }, [selectedChoice]);


    return <QuestionCard question={question}
                         answersElement={
                             <RadioGroup name={id}>
                                 {answers.map(answer => {
                                     return <FormControlLabel
                                         style={{marginLeft:0, marginRight:0}}
                                         key={answer.option}
                                         value={answer.option}
                                         control={<Radio onChange={() => handleChoiceChange(answer.option)}/>}
                                         className={
                                             showResults ? (answer.correct ?
                                                 'correctAnswer'
                                                 : 'wrongAnswer'): ''
                                         }
                                         label={<Markdown markdown={answer.option + ") " + answer.text}/>}/>;
                                 })}
                             </RadioGroup> }
                         totalPoints={totalPoints}
                         actualPoints={actualPoints}
                         showResults={showResults}
                         questionTypeName={"A-Frage: Wählen Sie eine Option"}/>
}