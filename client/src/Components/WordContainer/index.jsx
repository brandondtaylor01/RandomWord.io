import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Box, ButtonGroup, Button, Typography, Fade } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import ShuffleIcon from '@mui/icons-material/Shuffle';

export default function WordContainer() {
  const [cookies, setCookie] = useCookies(['randomwordio_recentwords']);
  const [word, setWord] = useState();
  const [locked, setLocked] = useState(true);

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

    // lock the shuffle button.
    setLocked(true);

    // fetch the word and update the state.
    fetchWord().then(res => {

      // get a copy of the words.
      let recentWords = cookies.randomwordio_recentwords;

      // if undefined, create an array, else, add to the array.
      if(typeof recentWords === 'undefined') {
        recentWords = [res];
      } else {
        recentWords = [...recentWords, res];
      }

      // trim as necessary.
      if(recentWords.length > 10) {
        recentWords.shift(); // remove the first item in the list.
      }

      setCookie('randomwordio_recentwords', recentWords, { path: '/' });
      setWord(res);

      // set lock timeout.
      setTimeout(() => {

        // unlock the shuffle button.
        setLocked(false);
      }, 1500);
    }).catch(err => {
      console.log(err);
    });
  }, [cookies, setCookie])

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
      setTimeout(() => {
        getWord();
      }, 1500);
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
        <Box>
          {locked &&
            <CircularProgress color="inherit" />
          }
          {!locked &&
            <Fade in={!locked} timeout={500}>
              <Typography sx={{fontSize: 'calc(4vw + 4vh + 2vmin)'}}>{word}</Typography>
            </Fade>
          }
        </Box>
      </Box>
      <Box sx={{marginTop: '16px'}}>
        <ButtonGroup variant="contained">
          <Button onClick={handleShuffle} disabled={locked} sx={{width: '75px', height: '50px'}}>
            <ShuffleIcon fontSize='large' />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
