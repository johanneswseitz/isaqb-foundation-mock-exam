import {
    Box,
    Card,
    CardActions,
    CardContent,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Tooltip,
    Typography
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React from "react";

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
        <Card >
            <CardContent>
                <Typography variant="h4" component="div">
                    {question}
                </Typography>
                {answersElement}
            </CardContent>
            <CardActions>
                <Typography>
                    {points + (points == 1 ? " Point" : " Points")}
                </Typography>
                {bull}
                <Typography>{questionTypeName}</Typography>
                <Tooltip title={questionTypeExplanation} arrow>
                    <HelpOutlineIcon/>
                </Tooltip>
            </CardActions>
        </Card>
    </Grid>

}