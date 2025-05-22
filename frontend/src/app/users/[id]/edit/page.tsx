'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import UserForm from '../../../components/UserForm';

interface User {
  _id: string;
  user: string;
  interest: string[];
  age: number;
  mobile: number;
  email: string;
}

export default function EditUser({ params }: { params: { id: string } }) {
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
      <Typography variant="h4" component="h1" gutterBottom>
        Edit User
      </Typography>
      <UserForm initialData={user} userId={params.id} />
    </Box>
  );
} 