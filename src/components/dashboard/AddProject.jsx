import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export const AddProject = (props) => (
  <Card
    sx={{ height: '100%' , background: '#21213E' }}
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
          </Typography>
          {/* <Typography
            variant="h4"
            color="primary"
          >
            $24k
          </Typography> */}
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        {/* <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
        
          variant="caption"
        >
          Since last month
        </Typography> */}
      </Box>
    </CardContent>
  </Card>
);
