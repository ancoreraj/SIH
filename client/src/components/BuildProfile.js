import { Box, Button, Container, FormHelperText, Grid, MenuItem, Paper, styled, TextField, Typography } from '@mui/material'
import { format } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';

const BackgroundBox = styled(Box)(({ theme }) => ({
    display: "flex",
    background: '#eee',
    justifyContent: 'center',
    minHeight: "calc(100vh - 69px)",
    p: 5
}))
// const StyledSelect = styled(Select)(({ theme }) => ({
//     minWidth: 290,
//     [theme.breakpoints.down('lg')]: {
//         minWidth: 220
//     },
//     [theme.breakpoints.down('md')]: {
//         minWidth: 150
//     },
// }))

const StyledTextField = styled(TextField)(({ theme }) => ({
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
    } else if (!NameRegex.test(firstName)) {
        errors.firstName = `First Name can't contain numbers and special characters`;
    }

    if (!lastName) {
        errors.lastName = 'Enter Last name';
    } else if (!NameRegex.test(lastName)) {
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
            <Container component={Paper} elevation={3} sx={{ m: 1, p: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant='h4' sx={{ mb: 1, color: "#212121" }}>Your Profile</Typography>
                    <Typography variant='subtitle1' sx={{ color: '#7b1fa2' }}>Complete your profile to continue.</Typography>
                </Box>

                <Grid sx={{ mb: 3 }} container gap={2}>
                    <Grid item md={5} xs={12}>
                        <StyledTextField value={firstName} error={Boolean(formErrors.firstName)} helperText={formErrors.firstName} onChange={e => { setFirstName(e.target.value) }} fullWidth label='First Name' />
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <StyledTextField value={lastName} error={Boolean(formErrors.lastName)} helperText={formErrors.lastName} onChange={e => { setLastName(e.target.value) }} fullWidth label='Last Name' />
                    </Grid>
                </Grid>

                <Grid sx={{ mb: 3 }} container>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Birth Date"
                            inputFormat="dd-MM-yyyy"
                            value={date}
                            onChange={newDate => { setDate(newDate) }}
                            openTo="year"
                            views={['year', 'month', 'day']}
                            renderInput={(params) => <TextField sx={{ minWidth: "300px" }} {...params} />}
                        />
                        <Grid container>
                            <FormHelperText sx={{ color: '#d32f2f' }}>{formErrors.date}</FormHelperText>
                        </Grid>
                    </LocalizationProvider>
                </Grid>

                {/* <Typography variant='body1' color={'#424242'} sx={{ mb: 1, color: '#7b1fa2' }}>Birth Date</Typography> */}

                {/* <Grid container gap={2} sx={{ mb: 4 }}>
                    <Grid item xs={3}>
                        <StyledTextField fullWidth name='day' error={Boolean(formErrors.day)} helperText={formErrors.day} onChange={handleDate} value={date.day} label="Day" />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl>
                            <InputLabel id="monthlabel">Month</InputLabel>
                            <StyledSelect
                                labelId='monthlabel'
                                name='month'
                                defaultValue={""}
                                value={date.month}
                                label="Month"
                                MenuProps={MenuProps}
                                onChange={handleDate}
                                error={Boolean(formErrors.month)}
                            >
                                <MenuItem value={'01'}>January</MenuItem>
                                <MenuItem value={'02'}>February</MenuItem>
                                <MenuItem value={'03'}>March</MenuItem>
                                <MenuItem value={'04'}>April</MenuItem>
                                <MenuItem value={'05'}>May</MenuItem>
                                <MenuItem value={'06'}>June</MenuItem>
                                <MenuItem value={'07'}>July</MenuItem>
                                <MenuItem value={'08'}>August</MenuItem>
                                <MenuItem value={'09'}>September</MenuItem>
                                <MenuItem value={'10'}>October</MenuItem>
                                <MenuItem value={'11'}>November</MenuItem>
                                <MenuItem value={'12'}>December</MenuItem>
                            </StyledSelect>
                            <FormHelperText sx={{ color: '#d32f2f' }}>{formErrors.month}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StyledTextField fullWidth name='year' error={Boolean(formErrors.year)} helperText={formErrors.year} onChange={handleDate} value={date.year} label="Year" />
                    </Grid>
                </Grid> */}



                <Grid sx={{ mb: 3 }} container gap={2}>

                    <Grid item md={5} xs={12}>
                        <StyledTextField
                            fullWidth
                            select
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
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <StyledTextField value={pinCode} error={Boolean(formErrors.pinCode)} helperText={formErrors.pinCode} onChange={e => { setPinCode(e.target.value) }} fullWidth sx={{ mb: 3 }} label='PIN Code' />
                    </Grid>
                </Grid>
                <Button onClick={handleSubmit} sx={{ minWidth: 100, mr: 3, background: "#7b1fa2", "&:hover": { background: "#ab47bc" } }} size='large' variant='contained'>Let's Go</Button>
                <Button onClick={handleClear} sx={{ minWidth: 100 }} size='large' variant='outlined' color='error'>Clear</Button>

            </ Container>
        </ BackgroundBox >
    )
}

export default BuildProfile