'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

interface User {
  _id: string;
  user: string;
  interest: string[];
  age: number;
  mobile: number;
  email: string;
}

export default function UserDetail({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}`);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching user');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}`);
        router.push('/');
      } catch (err) {
        setError('Error deleting user');
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        User not found
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          User Details
        </Typography>
        <Box>
          <Button
            component={Link}
            href={`/users/${params.id}/edit`}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {user.user}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {user.email}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Age
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {user.age}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Mobile
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {user.mobile}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Interests
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {user.interest.map((interest, index) => (
                <Chip
                  key={index}
                  label={interest}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box mt={3}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBackIcon />}
          color="primary"
        >
          Back to Users
        </Button>
      </Box>
    </Box>
  );
} 