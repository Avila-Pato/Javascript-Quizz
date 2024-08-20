import { RestartAlt } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { useQuestionsData } from "./assets/hooks/QuestionsData";
import { useQuestionsStore } from './store/question';


export const Footer = () => {
    const {
        correct,
        incorrect,
        unanswer,
        questions,
    } = useQuestionsData();

    const reset = useQuestionsStore(state => state.reset);

    return (
        <Stack direction="row" gap={2}>
           <IconButton color="primary" onClick={reset}>
                <RestartAlt />
            </IconButton>
            <Typography variant="h5" flex={1}>
                {`✅ ${correct} ❌ ${incorrect} ❓ ${unanswer}`}
            </Typography>
            <Typography variant="h5" flex={1}>
                {`✅ ${Math.ceil((correct / questions.length) * 100)}%`}
            </Typography>
        </Stack>
    );
};
