import { Box, List, ListItem, Typography } from "@mui/material";

export default function Definitions({ list, capitalize }) {
  return(
  <Box>
    {
      list.meanings.map((def, index) => {
        return(
          <Box key={index} sx={{display: 'flex', flexDirection: 'row', marginBottom: '32px'}}>
            <Box sx={{marginRight: '32px', maxWidth: '300px'}}>
              <Typography variant='h5'>{capitalize(def.partOfSpeech)}</Typography>
            </Box>

            <Box>
              <List dense disablePadding>
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
  )
}