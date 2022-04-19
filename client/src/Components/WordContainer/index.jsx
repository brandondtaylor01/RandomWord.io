import { useState } from 'react';
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Word from "../Word";

export default function WordContainer() {
  const [word, setWord] = useState('');

  function handleShuffle() {
    fetch( 'http://localhost:7777/get-word').then(res => res.json()).then(res => {
      if(res?.success) {
        if(typeof res.word !== 'undefined') {
          setWord(res.word);
        }
      }
    })
  }

  return(
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Word>
        <Typography variant='h2'>{word}</Typography>
      </Word>
      <Box sx={{marginTop: '16px'}}>
        <ButtonGroup variant="contained">
          <Button onClick={handleShuffle}>
              <ShuffleIcon fontSize='large' />
            </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
