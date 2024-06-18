import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from '../organs/UserDetailsContext';




export interface Data {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
}



const TableComponent: React.FC = () => {

  const { userDetails } = useUserDetails();

  const navigate = useNavigate();

  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const url = `https://localhost:7140/api/GetByRegistrationId/${userDetails.id}`;
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = (details : Data) => {    
    navigate('/UpdateBookingDetails',{state: details})
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`https://localhost:7140/api/DeleteTourBooking/${id}`);
      if(response.status == 200){
        navigate(0);
      }else{
        alert("Something went wrong please try again!");
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom paddingTop={10}>
        Booking Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(row)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row.id)}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableComponent;
