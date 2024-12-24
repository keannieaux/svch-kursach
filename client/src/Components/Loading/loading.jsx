import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0'
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loading;
