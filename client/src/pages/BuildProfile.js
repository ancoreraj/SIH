import { Box, Button, FormHelperText, Grid, MenuItem, Paper, styled, TextField, Typography } from '@mui/material'
import { format } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import registerImg from '../components/assets/img/register.png';
import { buildUserProfile } from '../utils/API_Calls';
import { useAuth } from "../context/AuthContext";

const BackgroundBox = styled(Box)(({ theme }) => ({
    display: "flex",
    minHeight: "100vh",
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

const validate = (userProfileData) => {
    let { firstName, lastName, dateOfBirth, qualification, pinCode } = userProfileData;
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

    if (dateOfBirth === null) {
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

const getFormattedDate = date => {
    const newDate = new Date(date);
    const dd = String(newDate.getDate()).padStart(2, '0');
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const yy = newDate.getFullYear();

    return `${dd}-${mm}-${yy}`;
}


const BuildProfile = () => {
    const { user } = useAuth();
    const [userProfileData, setUserProfileData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: new Date(user.dateOfBirth),
        qualification: user.qualification,
        pinCode: user.pincode,
        state: user.state
    });
    const [formErrors, setFormErrors] = useState({});

    const handleClear = () => {
        setUserProfileData({
            firstName: "",
            lastName: "",
            dateOfBirth: null,
            qualification: "",
            pinCode: "",
            state: ""
        });
        setFormErrors({});
    }

    const handleSubmit = async () => {
        const errors = validate(userProfileData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {

            const userData = {
                firstName: userProfileData.firstName,
                lastName: userProfileData.lastName,
                pincode: userProfileData.pinCode,
                qualification: userProfileData.qualification,
                dateOfBirth: format(userProfileData.dateOfBirth, "dd-MM-yyyy")
            }
           
            const response = await buildUserProfile(userData);
            if(response.error) {
                alert(response.message);
            } else {
                alert("Profile Updated");
            }

        }
    }

    return (
        <BackgroundBox>
            <Grid container>
                <Grid container item xs={12} lg={8} md={7} sx={{ px: 0 }}>
                    <img src={registerImg} alt="pm"
                        style={{
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </Grid>
                <Grid container item xs={12} lg={4} md={5}>
                    <Box
                        component={Paper}
                        elevation={3}
                        sx={{
                            minHeight: '100%',
                            px: 6,
                            width: "100%"
                        }}>
                        <Box sx={{ py: 4 }}>
                            <Box sx={{ mb: 5 }}>
                                <Typography
                                    variant='h4'
                                    sx={{ mb: 1, color: "#212121" }}
                                >
                                    Your Profile
                                </Typography>
                                <Typography
                                    variant='subtitle1'
                                    sx={{ color: '#7b1fa2' }}>
                                    Complete your profile to continue.
                                </Typography>
                            </Box>
                            <StyledTextField
                                sx={{ mr: 2, mb: 3 }}
                                size='small'
                                value={userProfileData.firstName}
                                error={Boolean(formErrors.firstName)}
                                helperText={formErrors.firstName}
                                onChange={e => setUserProfileData({
                                    ...userProfileData,
                                    firstName: e.target.value
                                })}
                                fullWidth
                                label='First Name'
                            />
                            <StyledTextField
                                sx={{ mb: 2 }}
                                size='small'
                                value={userProfileData.lastName}
                                error={Boolean(formErrors.lastName)}
                                helperText={formErrors.lastName}
                                onChange={e => setUserProfileData({
                                    ...userProfileData,
                                    lastName: e.target.value
                                })}
                                fullWidth
                                label='Last Name'
                            />
                            <br />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Birth Date"
                                    inputFormat="dd-MM-yyyy"
                                    value={userProfileData.dateOfBirth}
                                    onChange={newDate => setUserProfileData({
                                        ...userProfileData,
                                        dateOfBirth: newDate
                                    })}
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
                                value={userProfileData.qualification}
                                label="Qualification"
                                onChange={e => setUserProfileData({
                                    ...userProfileData,
                                    qualification: e.target.value
                                })}
                                helperText={formErrors.qualification}
                                error={Boolean(formErrors.qualification)}
                            >
                                <MenuItem value="10th Pass">10th Pass</MenuItem>
                                <MenuItem value="12th Pass">12th Pass</MenuItem>
                                <MenuItem value="Graduate">Graduate</MenuItem>
                                <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                            </StyledTextField>
                            <br />
                            <StyledTextField
                                sx={{ minWidth: "300px", mb: 4 }}
                                size='small'
                                value={userProfileData.pinCode}
                                error={Boolean(formErrors.pinCode)}
                                helperText={formErrors.pinCode}
                                onChange={e => setUserProfileData({
                                    ...userProfileData,
                                    pinCode: e.target.value
                                })}
                                label='PIN Code'
                            />
                            <br />
                            <StyledTextField
                                sx={{ minWidth: "300px", mb: 4 }}
                                disabled
                                size='small'
                                value={userProfileData.state}
                                helperText="Fetched automatically using pincode"
                                label='State'
                            />
                            <br />
                            <Button
                                onClick={handleSubmit}
                                sx={{
                                    minWidth: 100,
                                    mr: 3,
                                    background: "#7b1fa2",
                                    "&:hover": { background: "#ab47bc" }
                                }}
                                size='large'
                                variant='contained'>
                                Let's Go
                            </Button>
                            <Button
                                onClick={handleClear}
                                sx={{ minWidth: 100 }}
                                size='large'
                                variant='outlined'
                                color='error'>
                                Clear
                            </Button>
                        </Box>
                    </ Box>
                </Grid>
            </Grid>
        </ BackgroundBox >
    )
}

export default BuildProfile