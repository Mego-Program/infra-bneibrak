import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';



export const AddProject = (props) => (
  <Card
    sx={{ height: '100%', background: '#21213E' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Avatar
            sx={{
            bgcolor: "#F6C927" ,
            height: 50,
              width: 50
            }}
          >
            <TextSnippetIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography
           
            gutterBottom
            variant="overline"
            sx={{
            fontSize:10,
            
            }}
          >
            Add Project
            <br/>
          </Typography>
          <Typography
            variant="h4"
            color="primary"
          >
            +
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </Box>
    </CardContent>
  </Card>
);
