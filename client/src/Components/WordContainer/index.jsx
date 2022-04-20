import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Box, ButtonGroup, Button, Typography, Fade } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export default function WordContainer({
  word,
  setWord,
  openDefinitionDrawer,
  fetchDefinition,
  setDefinition
}) {
  const [cookies, setCookie] = useCookies(['randomwordio_recentwords']);
  const [locked, setLocked] = useState(true);

  const fetchWord = useCallback(() => {

    // fetch the word and update the state.
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
    })
  }, []);

  const handleShuffle = useCallback(() => {

    // lock buttons.
    setLocked(true);

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

      // setup the cookie.
      setCookie('randomwordio_recentwords', recentWords, { path: '/', sameSite: 'strict', secure: true });

      // set the word.
      setWord(res);

      // fetch the definition.
      fetchDefinition(res).catch((err) => {

        // if we couldn't get the definition, set it to blank.
        // this will tell the definition panel to display the error.
        if(!err?.success) {
          setDefinition('');
        }
      });

      // set lock timeout.
      setTimeout(() => {

        // unlock the shuffle button.
        setLocked(false);
      }, 1500);
    }).catch(err => {
      console.log(err);

      // unlock the shuffle button.
      setLocked(false);
    });
  }, [fetchWord, cookies, fetchDefinition, setCookie, setDefinition, setWord]);

  // Lifecycle
  // Run-once to setup the initial word.
  useEffect(() => {
    if(word === '' || typeof word === 'undefined') {
      setTimeout(() => {
        handleShuffle();
      }, 500);
    }
  }, [word, handleShuffle]);

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
              <Typography sx={{fontSize: 'calc(4vw + 4vh + 2vmin)', cursor: 'pointer'}} onClick={openDefinitionDrawer}>{word}</Typography>
            </Fade>
          }
        </Box>
      </Box>
      <Box sx={{marginTop: '16px'}}>
        <ButtonGroup variant="contained">
          <Button onClick={handleShuffle} disabled={locked} sx={{minWidth: '75px', height: '50px'}}>
            <ShuffleIcon fontSize='large' />&nbsp;Shuffle
          </Button>

          <Button onClick={openDefinitionDrawer} disabled={locked} sx={{minWidth: '75px', height: '50px'}}>
            <LibraryBooksIcon fontSize='large' />&nbsp;Definition
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
