import {
    Box,
    Card,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import React from "react";
import {theme} from "./App";
import {Markdown} from "./Markdown";

interface QuestionCardElements {
    question: String,
    answersElement: JSX.Element,
    totalPoints: Number,
    actualPoints: Number,
    questionTypeName: String,
    showResults: boolean
}


export function QuestionCard({question, answersElement, totalPoints, questionTypeName, actualPoints,showResults}: QuestionCardElements){
    return <Card sx={{width: 800}} >
            <Box sx={{p: 4}} bgcolor={theme.palette.primary.light}>
                <Stack direction="row" justifyContent="space-between" >
                    <Typography gutterBottom variant="h5" component="div" mr={10}>
                        <Markdown markdown={question}/>
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {
                            (showResults  ?  Number(actualPoints).toFixed(2)  : "?") + "\u00A0/\u00A0"
                        }
                         {totalPoints + (totalPoints == 1 ? "\u00A0Punkt" : "\u00A0Punkte")}
                    </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                    <Markdown markdown={questionTypeName}/>
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                {answersElement}
            </Box>
        </Card>

}