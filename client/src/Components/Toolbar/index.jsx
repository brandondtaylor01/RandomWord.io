import { Box, ButtonGroup, Button } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Toolbar(props) {
  return(
    <Box
      position='absolute'
      top='0'
      right='0'

      marginTop='16px'
      marginRight='16px'

      display={{
        xs: 'flex',
      }}
    >
      <ButtonGroup variant="contained">
        <Button onClick={props.toggleThemeMode}>{props.themeMode === 'dark'
          ? <DarkModeIcon />
          : <LightModeIcon />
        }</Button>
      </ButtonGroup>  
    </Box>
  );
}