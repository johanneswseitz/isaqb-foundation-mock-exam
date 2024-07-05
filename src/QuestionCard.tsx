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



const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


export function QuestionCard({question, answersElement, points, questionTypeName, questionTypeExplanation}: QuestionCardElements){
    return <Grid item xs={12}>
        <Card variant="outlined" >
            <Box sx={{ p: 2 }} bgcolor={theme.palette.secondary.light}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div">
                        <Markdown markdown={question}/>
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {points + (points == 1 ? " Punkt" : " Punkte")}
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
    </Grid>

}