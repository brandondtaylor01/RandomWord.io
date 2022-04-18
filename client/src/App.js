import React, { useState, useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Toolbar from "./Components/Toolbar";
import WordContainer from './Components/WordContainer';

function App() {
  const [themeMode, setThemeMode] = useState('dark');

  /**
   * Returns a palette object depending on it the mode is 'light' or 'dark'.
   * @param mode - 'light' or 'dark'
   * @returns an object.
   */
  const getDesignTokens = (mode) => {
    let darkMode = {
      palette: {
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
        background: {
          default: '#e0e0e0'
        },
        primary: {
          main: '#333f4d',
        }
      }
    }

    return mode === 'dark' ? darkMode : lightMode;
  }

  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

  function toggleThemeMode() {
    setThemeMode((prev) => prev === 'dark' ? 'light' : 'dark');
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Toolbar toggleThemeMode={toggleThemeMode} themeMode={themeMode} />
        <WordContainer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
