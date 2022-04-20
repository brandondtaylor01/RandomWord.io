import { Box, List, ListItem, Typography, Link } from "@mui/material";

export default function SearchSuggestion({ word }) {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100px', padding: '8px'}}>
            <Typography variant="h6">You can search for it:</Typography>
            <List sx={{display: 'flex', flexDirection: 'row'}}>
                <ListItem>
                    <Link href={"https://duckduckgo.com/?q=" + word} target='_blank' rel='noopener'>DuckDuckGo</Link>
                </ListItem>

                <ListItem>
                    <Link href={"https://google.com/search?q=" + word} target='_blank' rel='noopener'>Google</Link>
                </ListItem>

                <ListItem>
                    <Link href={"https://bing.com.com/search?q=" + word} target='_blank' rel='noopener'>Bing</Link>
                </ListItem>
            </List>
        </Box>
    )
}