import { useState } from 'react';
import { Box, ButtonGroup, Button } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Word from "../Word";

export default function WordContainer() {
  const [word, setWord] = useState('');

  function handleShuffle() {
    fetch( 'https://www.randomword.io:7777/get-word').then(res => res.json()).then(res => {
      if(res?.success) {
        if(typeof res.word !== 'undefined') {
          setWord(res.word);
        }
      }
    }).catch(err => {
      console.log(err);
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
      <Box
        height='200px'
        width='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Word>
          {word}
        </Word>
      </Box>
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
