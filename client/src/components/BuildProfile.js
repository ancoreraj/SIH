import { Container, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

const BuildProfile = () => {
    return (
        <Container component={Paper} elevation={1} sx={{ mt: 2, p: 2 }}>
            <Typography mb={1} align='center' variant="h5">Build your profile</Typography>
            <Divider />
            <Grid container>

            </Grid>
        </Container>
    )
}

export default BuildProfile