import { useCallback, useEffect, useState } from 'react';
import { Box, ButtonGroup, Button } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Word from "../Word";

export default function WordContainer() {
  const [word, setWord] = useState();
  const [locked, setLocked] = useState(false);

  function fetchWord() {
    return new Promise((resolve, reject) => {
      // fetch the next word.
      fetch( 'https://www.randomword.io:7777/get-word').then(res => res.json()).then(res => {

        // if we were successful, resolve the Promise, else, reject it.
        return (res?.success) ? resolve(res.word) : reject(new Error(res))
      }).catch(err => {
        console.log(err);
        return reject(new Error({
          success: false,
          error: err
        }));
      });
    });
  }


  const getWord = useCallback(() => {

    setLocked(true);

    // fetch the word and update the state.
    fetchWord().then(res => {
      setWord(res);

      // set lock timeout.
      setTimeout(() => {
        setLocked(false);
      }, 1500);
    }).catch(err => {
      console.log(err);
    });
  }, [])

  function handleShuffle() {

    // if we aren't locked.
    // we do this because we don't want the user requesting in rapid succession.
    if(!locked) {
      getWord();
    }
  }

  // Lifecycle
  // Run-once to setup the initial word.
  useEffect(() => {
    if(word === '' || typeof word === 'undefined') {
      getWord();
    }
  }, [word, getWord]);

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
          <Button onClick={handleShuffle} disabled={locked}>
              <ShuffleIcon fontSize='large' />
            </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
