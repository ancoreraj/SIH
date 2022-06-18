import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { Link as LinkRouter } from 'react-router-dom';
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import pmImg from './assets/img/pm.jpg'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react'

const Login = () => {

    const [showPassowrd, setShowPassowrd] = useState(false);
    const [formErrors, setFormErrors] = useState({ });

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required.";
        } else if (!regex.test(values.email)) {
            errors.email = "Not a valid email address.";
        }
        if (!values.password) {
            errors.password = "Password is required.";
        } else if (values.password.length < 6) {
            errors.password = "Password must contain 6-15 characters.";
        } else if (values.password.length > 15) {
            errors.password = "Password must contain 6-15 characters.";
        }
        return errors
    };

    const handleSubmit = () => {
        const errors = validate(values);
        setFormErrors(errors)
        if (Object.keys(errors).length === 0) {
            
            // console.log(values);
            // Code for the API call
            
        }
    }

    return (
        <Grid container sx={{ minHeight: 'calc(100vh - 69px)' }}>
            <Grid item xs={12} md={8}>
                <img src={pmImg} alt="pm"
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </Grid>
            <Grid container item direction='column' alignItems='center' justifyContent='center' xs={12} md={4}>
                <Box sx={{ height: '100%', maxWidth: '100%', minWidth: '320px', padding: '4rem 0' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                        <Typography variant='h4'>Login</Typography>
                    </Box>

                    <form autoComplete='off'>
                        <Box sx={{ my: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <EmailOutlinedIcon sx={{ mr: 2 }} />
                                <TextField
                                    error={Boolean(formErrors.email)} helperText={formErrors.email}
                                    name='email' onChange={handleChange} value={values.email}
                                    variant='outlined' size='small'
                                    type='email' label='Email' fullWidth
                                />
                            </Box>


                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LockOutlinedIcon sx={{ mr: 2 }} />
                                <TextField
                                    helperText={formErrors.password} error={Boolean(formErrors.password)}
                                    value={values.password} name='password' onChange={handleChange}
                                    type={showPassowrd ? 'text' : 'password'} label='Password'
                                    variant='outlined' size='small' fullWidth
                                />
                            </Box>
                            <FormGroup sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={showPassowrd} onChange={e => { setShowPassowrd(!showPassowrd) }} />}
                                    label={<Typography variant='body2'>Show Password</Typography>}
                                />
                            </FormGroup>
                        </Box>
                        <Button onClick={handleSubmit} variant='contained' sx={{ mb: 2 }} color='primary' fullWidth>Login</Button>
                    </form>
                    <Typography variant='caption'>Don't have an account? <LinkRouter to='/signup' style={{
                        textDecoration: 'none',
                        color: '#1976d2'
                    }}>Sign Up</LinkRouter></Typography>

                </Box>
            </Grid>
        </Grid>
    )
}

export default Login