import { Box } from "@mui/system";

export default function Word(props) {
    return(
        <Box sx={{
            fontSize: 'calc(4vw + 4vh + 2vmin)'
        }}>{props.children}</Box>
    );
}