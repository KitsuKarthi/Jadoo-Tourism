import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Data} from './BookingDetails'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Kitsu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function UpdateBookingDetails() {

  const location = useLocation();
  const details = location.state as Data;
  
  const [formData, setFormData] = useState<Data> ({
    id:'',
    name: '',
    phoneNumber: '',
    address: ''
  }) 

  React.useEffect(() => {
    if (details) {
      setFormData(details);
    }
  }, [details]);
  
  const UpdatedData = {
    name: formData.name,
    phoneNumber: formData.phoneNumber,
    address: formData.address
  }

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await axios.put(`https://localhost:7140/api/UpdateTourBooking/${id}`, UpdatedData);
      if(response.status == 200){
        navigate('/BookingDetails');
      }else{
        alert("Something went wrong please try again!");
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5" padding={5}>
            Update your Booking
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Name"                  
                  label="Name"
                  name="name"
                  onChange={handleChange}value={formData.name}
                  autoComplete="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth                  
                  label="Phone Number"
                  id="PhoneNumber"
                  name="phoneNumber"
                  onChange={handleChange}value={formData.phoneNumber}
                  autoComplete="PhoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="Address"
                  onChange={handleChange}value={formData.address}
                  autoComplete="Address"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleUpdate(formData.id)}
              sx={{ mt: 3, mb: 2 }}
            >
              Update Booking
            </Button>
          </form>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
