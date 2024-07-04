import {
    Box,
    Card,
    CardActions,
    CardContent, Divider,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup, Stack,
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

function convertMarkdownToHtml(markdown:String) {
    const boldRegex = /(\*\*|__)(.*?)\1/g;
    let html = markdown.replace(boldRegex, '<strong>$2</strong>');
    const italicRegex = /(\*|_)(.*?)\1/g;
    html = html.replace(italicRegex, '<em>$2</em>');
    return html;
}


export function QuestionCard({question, answersElement, points, questionTypeName, questionTypeExplanation}: QuestionCardElements){
    return <Grid item xs={12}>
        <Card variant="outlined" >
            <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div">
                        {question}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {points + (points == 1 ? " Punkt" : " Punkte")}
                    </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2"
                            dangerouslySetInnerHTML={{__html:convertMarkdownToHtml(questionTypeName) }}>
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                {answersElement}
            </Box>
        </Card>
    </Grid>

}