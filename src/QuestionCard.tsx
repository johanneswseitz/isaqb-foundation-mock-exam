import {
    Box,
    Card,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import React from "react";
import {Markdown, theme} from "./App";

interface QuestionCardElements {
    question: String,
    answersElement: JSX.Element,
    points: Number,
    questionTypeName: String,
    questionTypeExplanation:String
}


export function QuestionCard({question, answersElement, points, questionTypeName, questionTypeExplanation}: QuestionCardElements){
    return <Card sx={{width: 800}} >
            <Box sx={{p: 4}} bgcolor={theme.palette.primary.light}>
                <Stack direction="row" justifyContent="space-between" >
                    <Typography gutterBottom variant="h5" component="div">
                        <Markdown markdown={question}/>
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {points + (points == 1 ? "\u00A0Punkt" : "\u00A0Punkte")}
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