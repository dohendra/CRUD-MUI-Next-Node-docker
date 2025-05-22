'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Alert
} from '@mui/material';

interface UserFormData {
  user: string;
  interest: string;
  age: number;
  mobile: number;
  email: string;
}

interface UserFormProps {
  initialData?: {
    user: string;
    interest: string[];
    age: number;
    mobile: number;
    email: string;
  };
  userId?: string;
}

const schema = yup.object().shape({
  user: yup.string().required('Name is required'),
  interest: yup.string().required('At least one interest is required'),
  age: yup.number().required('Age is required').min(0, 'Age must be positive'),
  mobile: yup.number().required('Mobile number is required').test(
    'len',
    'Mobile number must be at least 10 digits',
    val => val.toString().length >= 10
  ),
  email: yup.string().email('Invalid email').required('Email is required')
});

export default function UserForm({ initialData, userId }: UserFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData ? {
      ...initialData,
      interest: initialData.interest.join(', ')
    } : {
      user: '',
      interest: '',
      age: undefined,
      mobile: undefined,
      email: ''
    }
  });

  const onSubmit = async (data: UserFormData) => {
    try {

      const formattedData = {
        ...data,
        interest: data.interest.split(',').map(item => item.trim()).filter(Boolean)
      };

      if (userId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, formattedData);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, formattedData);
      }
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              {...register('user')}
              error={!!errors.user}
              helperText={errors.user?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Interests (comma-separated)"
              {...register('interest')}
              error={!!errors.interest}
              helperText={errors.interest?.message || "Enter interests separated by commas"}
              placeholder="e.g., Comics, Sports"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              type="number"
              {...register('age')}
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile"
              type="number"
              {...register('mobile')}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {userId ? 'Update' : 'Create'} User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
} 