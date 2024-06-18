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
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../organs/AuthContext';
import { useUserDetails } from '../organs/UserDetailsContext';

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

const defaultTheme = createTheme();

export default function BookingTour() {
  const { userDetails } = useUserDetails();

  interface BookingTourFormState {
    name: string;
    phonenumber: string;
    address: string;
    registrationId: string;
  }

  const [formData, setFormData] = useState<BookingTourFormState>({
    name: '',
    phonenumber: '',
    address: '',
    registrationId: ''
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      registrationId: userDetails.id
    }));
    console.log('User Details:', userDetails); // Log user details for debugging
  }, [userDetails]);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Form Data:', formData); // Log form data for debugging

    try {
      const response = await axios.post('https://localhost:7140/api/CreateTourBooking', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        login();
        navigate('/');
      } else {
        alert("Something went wrong, please try again!");
      }
    } catch (error) {
      console.error('Error:', error);
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
            Tour Booking
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  id="phonenumber"
                  name="phonenumber"
                  onChange={handleChange}
                  value={formData.phonenumber}
                  autoComplete="phonenumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  onChange={handleChange}
                  value={formData.address}
                  autoComplete="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Book
            </Button>
          </form>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
