import { Box, Button, FormHelperText, Grid, MenuItem, Paper, styled, TextField, Typography } from '@mui/material'
import { format } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import registerImg from './assets/img/register.png';

const BackgroundBox = styled(Box)(({ theme }) => ({
    display: "flex",
    minHeight: "calc(100vh - 69px)",
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
    maxWidth: 200,
    [theme.breakpoints.down('sm')]: {
        maxWidth: 300
    },
    '& label.Mui-focused': {
        color: '#7b1fa2',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#7b1fa2',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#7b1fa2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#7b1fa2',
        },
    },
}))

const validate = (firstName, lastName, qualification, pinCode, date) => {
    const errors = {};
    const NameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const pinCodeRegex = /^[1-9]{1}[0-9]{5}$/

    if (!firstName) {
        errors.firstName = 'Enter First name';
    } else if (!NameRegex.test(firstName.trim())) {
        errors.firstName = `First Name can't contain numbers and special characters`;
    }

    if (!lastName) {
        errors.lastName = 'Enter Last name';
    } else if (!NameRegex.test(lastName.trim())) {
        errors.lastName = `Last Name can't contain numbers and special characters`;
    }

    if (date == null) {
        errors.date = "Select your Birth Date"
    }

    if (!qualification) {
        errors.qualification = 'Select your Qualification';
    }

    if (!pinCode) {
        errors.pinCode = 'Enter a valid Pin Code';
    } else if (!pinCodeRegex.test(pinCode)) {
        errors.pinCode = 'Enter a valid Pin Code';
    }

    return errors;
};

const BuildProfile = () => {

    const [date, setDate] = useState(null);
    const [qualification, setQualification] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleClear = () => {
        setDate(null);
        setQualification("");
        setFirstName("");
        setLastName("");
        setPinCode("");
        setFormErrors({});
    }

    const handleSubmit = () => {
        const errors = validate(firstName, lastName, qualification, pinCode, date);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {

            const apiData = {
                firstName,
                lastName,
                qualification,
                pinCode,
                date: format(date, "dd-MM-yyyy")
            }

            console.log(apiData)

        }
    }

    return (
        <BackgroundBox>
            <Grid container>
                <Grid container item xs={12} lg={8} md={7} sx={{ px: 0 }}>
                    <img src={registerImg} alt="pm"
                        style={{
                            width: '100%',
                            maxHeight: '645px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </Grid>
                <Grid container item xs={12} lg={4} md={5}>
                    <Box component={Paper} elevation={3} sx={{ minHeight: '100%', px: 6, width: "100%" }}>
                        <Box sx={{ py: 4 }}>
                            <Box sx={{ mb: 5 }}>
                                <Typography variant='h4' sx={{ mb: 1, color: "#212121" }}>Your Profile</Typography>
                                <Typography variant='subtitle1' sx={{ color: '#7b1fa2' }}>Complete your profile to continue.</Typography>
                            </Box>
                            <StyledTextField sx={{ mr: 2, mb: 3 }} size='small' value={firstName} error={Boolean(formErrors.firstName)} helperText={formErrors.firstName} onChange={e => { setFirstName(e.target.value) }} fullWidth label='First Name' />
                            <StyledTextField sx={{ mb: 2 }} size='small' value={lastName} error={Boolean(formErrors.lastName)} helperText={formErrors.lastName} onChange={e => { setLastName(e.target.value) }} fullWidth label='Last Name' />
                            <br />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Birth Date"
                                    inputFormat="dd-MM-yyyy"
                                    value={date}
                                    onChange={newDate => { setDate(newDate) }}
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    renderInput={(params) => <TextField size='small' sx={{ minWidth: "300px" }} {...params} />}
                                />
                                <FormHelperText sx={{ color: '#d32f2f', mb: 3 }}>{formErrors.date}</FormHelperText>
                            </LocalizationProvider>
                            <StyledTextField
                                fullWidth
                                select
                                sx={{ minWidth: "300px", mb: 3 }}
                                size='small'
                                value={qualification}
                                label="Qualification"
                                onChange={e => { setQualification(e.target.value) }}
                                helperText={formErrors.qualification}
                                error={Boolean(formErrors.qualification)}
                            >
                                <MenuItem value="10th Pass">10th Pass</MenuItem>
                                <MenuItem value="12th Pass">12th Pass</MenuItem>
                                <MenuItem value="Graduate">Graduate</MenuItem>
                                <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                            </StyledTextField>
                            <br />
                            <StyledTextField sx={{ minWidth: "300px", mb: 4 }} size='small' value={pinCode} error={Boolean(formErrors.pinCode)} helperText={formErrors.pinCode} onChange={e => { setPinCode(e.target.value) }} label='PIN Code' />
                            <br />
                            <Button onClick={handleSubmit} sx={{ minWidth: 100, mr: 3, background: "#7b1fa2", "&:hover": { background: "#ab47bc" } }} size='large' variant='contained'>Let's Go</Button>
                            <Button onClick={handleClear} sx={{ minWidth: 100 }} size='large' variant='outlined' color='error'>Clear</Button>
                        </Box>
                    </ Box>
                </Grid>
            </Grid>
        </ BackgroundBox >
    )
}

export default BuildProfile