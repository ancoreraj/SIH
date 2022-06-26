import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { Link as LinkRouter } from 'react-router-dom';
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import pmImg from './assets/img/pm.jpg'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyIcon from '@mui/icons-material/Key';
import { useState } from 'react'
import { registerUser } from '../utils/API_Calls';


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

    if (!values.confirm) {
        errors.confirm = "Password is required.";
    } else if (values.password !== values.confirm) {
        errors.confirm = "Passwords do not match.";
    }
    return errors
};

const SignUp = () => {

    const [showPassowrd, setShowPassowrd] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirm: '',
    });

    const handleChange = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const errors = validate(values);
        setFormErrors(errors)

        if (Object.keys(errors).length === 0) {
            const response = await registerUser({
                email: values.email,
                password: values.password,
                isAdmin: false,
                organizationName: ""
            });
            if(response.error) {
                // implement error toast
                alert(response.message);
            } else {
                // implement success toast
                window.location.href = "/login";
            }
        }
    }

    return (
        <Grid container sx={{ minHeight: '100vh' }}>
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
            <Grid container item direction='column'
                alignItems='center' justifyContent='center'
                xs={12} md={4}
            >
                <Box sx={{ height: '100%', maxWidth: '100%', minWidth: '320px', padding: '3rem 0' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                        <Typography variant='h4'>Sign Up</Typography>
                    </Box>

                    <form>
                        <Box sx={{ my: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <EmailOutlinedIcon sx={{ mr: 2 }} />
                                <TextField
                                    value={values.email}
                                    onChange={handleChange}
                                    error={Boolean(formErrors.email)}
                                    helperText={formErrors.email}
                                    name='email'
                                    variant='outlined'
                                    size='small'
                                    type='email'
                                    label='Email'
                                    fullWidth
                                />
                            </Box>


                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <LockOutlinedIcon sx={{ mr: 2 }} />
                                <TextField
                                    value={values.password}
                                    onChange={handleChange}
                                    error={Boolean(formErrors.password)}
                                    helperText={formErrors.password}
                                    name='password'
                                    type={showPassowrd ? 'text' : 'password'}
                                    label='Password'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <KeyIcon sx={{ mr: 2 }} />
                                <TextField
                                    value={values.confirm}
                                    onChange={handleChange}
                                    error={Boolean(formErrors.confirm)}
                                    helperText={formErrors.confirm}
                                    name='confirm'
                                    type={showPassowrd ? 'text' : 'password'}
                                    label='Confirm'
                                    variant='outlined'
                                    size='small'
                                    fullWidth
                                />
                            </Box>

                            <FormGroup sx={{ mb: 4 }}>
                                <FormControlLabel
                                    control={<Checkbox checked={showPassowrd} onChange={e => { setShowPassowrd(!showPassowrd) }} />}
                                    label={<Typography variant='body2'>Show Password</Typography>}
                                />
                            </FormGroup>

                        </Box>
                        <Button onClick={handleSubmit} variant='contained' sx={{ mb: 2 }} color='primary' fullWidth>Sign Up</Button>
                    </form>
                    <Typography variant='caption'>Already have an account? <LinkRouter to='/' style={{
                        textDecoration: 'none',
                        color: '#1976d2'
                    }}>Sign In</LinkRouter></Typography>

                </Box>
            </Grid>
        </Grid>
    )
}

export default SignUp