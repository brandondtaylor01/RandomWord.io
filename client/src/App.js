import React, { useState, useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, Drawer, List, ListItem, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { CookiesProvider } from 'react-cookie';
import Toolbar from "./Components/Toolbar";
import WordContainer from './Components/WordContainer';

function App() {
  const [themeMode, setThemeMode] = useState('dark');
  const [word, setWord] = useState();
  const [definition, setDefinition] = useState({})
  const [definitionDrawerOpen, setDefinitionDrawerOpen] = useState(false);

  /**
   * Returns a palette object depending on it the mode is 'light' or 'dark'.
   * @param mode - 'light' or 'dark'
   * @returns an object.
   */
  const getDesignTokens = (mode) => {
    let darkMode = {
      palette: {
        mode: 'dark',
        background: {
          default: '#212121'
        },
        primary: {
          main: '#333f4d',
        }
      }
    }

    let lightMode = {
      palette: {
        mode: 'light',
        background: {
          default: '#fff'
        },
        primary: {
          main: '#2196f3',
        }
      }
    }

    return mode === 'dark' ? darkMode : lightMode;
  }

  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

  const fetchDefinition = (word) => {
    return new Promise((resolve, reject) => {
      fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word).then(res => {
        // if the word can't be found, send error.
        if(res.status === 404) {
          return reject(new Error({
            success: false,
            reason: 'Definition not found.'
          }));
        } else {

          // convert body to JSON and then show definition.
          res.json().then(res => {
            setDefinition(res[0]);
            return resolve();
          })
        }
      }).catch(err => {
        return reject(new Error(err));
      })
    });
  }

  const toggleThemeMode = () => {
    setThemeMode((prev) => prev === 'dark' ? 'light' : 'dark');
  }
  
  const openDefinitionDrawer = () => {
    setDefinitionDrawerOpen(true);
  }

  const closeDefinitionDrawer = () => {
    setDefinitionDrawerOpen(false);
  }

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.substring(1);
  }

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Toolbar toggleThemeMode={toggleThemeMode} themeMode={themeMode} />
          <WordContainer
            fetchDefinition={fetchDefinition}
            setDefinition={setDefinition}
            openDefinitionDrawer={openDefinitionDrawer}
            word={word}
            setWord={setWord}
          />
        </Box>
        
        <Drawer anchor='bottom' open={definitionDrawerOpen} onClose={closeDefinitionDrawer}>

          {/* If we have a definition to show */
            typeof definition.word !== 'undefined' &&
            <Box sx={{width: '100%', maxWidth: '1200px', maxHeight: '50vh', margin: 'auto'}}>
              <Box sx={{textAlign: 'center'}}>
                <Typography variant='h2'>{capitalize(word)}</Typography>
              </Box>

              <Box>
              {
                definition.meanings.map((def, index) => {
                  return(
                    <Box key={index} sx={{display: 'flex', flexDirection: 'row', marginBottom: '32px'}}>
                      <Box sx={{width:'100%', maxWidth: '300px'}}>
                        <Typography variant='h5'>{capitalize(def.partOfSpeech)}</Typography>
                      </Box>

                      <Box>
                        <Typography variant='h5'>Definitions</Typography>
                        <List>
                          {
                            def.definitions.map((def, index) => {
                              return(
                                <ListItem key={index} disableGutters dense>
                                  {index+1}. {def.definition}
                                </ListItem>
                              )
                            })
                          }
                        </List>
                      </Box>
                    </Box>
                  )
                })
              }
              </Box>
            </Box>
          }

          {
            definition === '' &&
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100px'}}>
              <Typography variant="h5">No definition found for that word. Why not try another?</Typography>
            </Box>
          }
        </Drawer>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
