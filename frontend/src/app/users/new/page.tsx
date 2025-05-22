'use client';

import { Box, Typography } from '@mui/material';
import UserForm from '../../components/UserForm';

export default function NewUser() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New User
      </Typography>
      <UserForm />
    </Box>
  );
} 