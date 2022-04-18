import { useState } from 'react';
import { Box, ButtonGroup, Button, CircularProgress, } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Word from "../Word";

export default function WordContainer() {
  const [word,    setWord]    = useState(null);
  const [loading, setLoading] = useState(false);

  function handleShuffle() {
    setLoading(!loading);
    setWord(<CircularProgress fontSize="large" />);
    setTimeout(() => {
      setWord('Test!')
    }, 1500)
  }

  return(
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Word word={word} />
      <Box>
        <ButtonGroup variant="contained">
          <Button onClick={handleShuffle}>
              <ShuffleIcon fontSize='large' />
            </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
