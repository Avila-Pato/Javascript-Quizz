
// Estado global de la paginazion p[ara que aparescan las preguntas segun su respuesta 
// y esta responda de manera correcta, incorrecta o unsawer  

import { RestartAlt } from "@mui/icons-material"
import { IconButton, Stack, Typography } from "@mui/material"
import { useQuestionsData } from "./assets/hooks/QuestionsData"

// vamos a usar un costomHokks que es lo que react ofrece 

export const Footer = () => {
    const {
        correct,
        incorrect,
        unanswer,
        questions,
    } = useQuestionsData()

    
    return (
        <Stack direction="row" gap={2}>
            <IconButton color="primary" onClick={() => location.reload()}>
                <RestartAlt />
            </IconButton>
            <Typography variant="h5" flex={1}>
                {`✅ ${correct} ❌ ${incorrect} ❓ ${unanswer}`}
            </Typography>
            <Typography variant="h5" flex={1}>
                {`✅ ${Math.ceil((correct / questions.length) * 100)}%`}
            </Typography>
        </Stack>
    )
    
    
}