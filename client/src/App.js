import { createTheme, ThemeProvider } from "@mui/system";

function App() {

  const darkTheme = prefersDarkTheme();

  // build our app's theme.
  // this uses an immediately invoked function because the ThemeProvider below shouldn't take a prop function
  // and we only want the return value of the "createTheme" function call.
  const theme = (() => {
    return darkTheme
      ? createTheme({
        fontFamily: [
          'Roboto',
          'sans-serif',
        ].join(',')
      })
      
      : createTheme({
        palette: {
          mode: 'dark'
        },
        fontFamily: [
          'Roboto',
          'sans-serif',
        ].join(',')
      });
  })();

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <h1>Hello, world!</h1>
      </div>
    </ThemeProvider>
  );
}

/**
 * The function uses the prefers-color-scheme media query to determine if the user prefers a dark theme
 * @returns A boolean value.
 */
function prefersDarkTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)")?.matches;
}

export default App;
