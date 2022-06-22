import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
        },
    }
};
const BackgroundBox = styled(Box)(({ theme }) => ({
    display: "flex",
    background: '#eee',
    justifyContent: 'center',
    minHeight: "calc(100vh - 69px)",
    p: 5
}))
const StyledSelect = styled(Select)(({ theme }) => ({
    minWidth: 290,
    [theme.breakpoints.down('lg')]: {
        minWidth: 220
    },
    [theme.breakpoints.down('md')]: {
        minWidth: 150
    },
}))

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

// const validate = (values) => {
//     const errors = {};
//     const regexName = "/^[a-z,.'-]+$/i";
//     const regexPinCode = "^[0-9]{5}(?:-[0-9]{4})?$";
//     const regexDay = "([1-9]|[12]\d|3[01])";

//     if (!values.email) {
//         errors.email = "Email is required.";
//     } else if (!regex.test(values.email)) {
//         errors.email = "Not a valid email address.";
//     }
//     if (!values.password) {
//         errors.password = "Password is required.";
//     } else if (values.password.length < 6) {
//         errors.password = "Password must contain 6-15 characters.";
//     } else if (values.password.length > 15) {
//         errors.password = "Password must contain 6-15 characters.";
//     }
//     return errors;
// };

const BuildProfile = () => {

    const [date, setDate] = useState({
        day: "",
        month: "",
        year: ""
    });
    const [qualification, setQualification] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [formErrors, setFormErrors] = useState({});


    const handleDate = (e) => {
        setDate({
            ...date,
            [e.target.name]: e.target.value
        })
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
                        <StyledTextField value={firstName} onChange={e => { setFirstName(e.target.value) }} fullWidth label='First Name' />
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <StyledTextField value={lastName} onChange={e => { setLastName(e.target.value) }} fullWidth label='Last Name' />
                    </Grid>
                </Grid>

                <Typography variant='body1' color={'#424242'} sx={{ mb: 1 }}>Birth Date</Typography>

                <Grid container gap={2} sx={{ mb: 4 }}>
                    <Grid item xs={3}>
                        <StyledTextField fullWidth name='day' onChange={handleDate} value={date.day} label="Day" />
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
                            >
                                <MenuItem value={1}>January</MenuItem>
                                <MenuItem value={2}>February</MenuItem>
                                <MenuItem value={3}>March</MenuItem>
                                <MenuItem value={4}>April</MenuItem>
                                <MenuItem value={5}>May</MenuItem>
                                <MenuItem value={6}>June</MenuItem>
                                <MenuItem value={7}>July</MenuItem>
                                <MenuItem value={8}>August</MenuItem>
                                <MenuItem value={9}>September</MenuItem>
                                <MenuItem value={10}>October</MenuItem>
                                <MenuItem value={11}>November</MenuItem>
                                <MenuItem value={12}>December</MenuItem>
                            </StyledSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <StyledTextField fullWidth name='year' onChange={handleDate} value={date.year} label="Year" />
                    </Grid>
                </Grid>

                <Grid sx={{ mb: 3 }} container gap={2}>

                    <Grid item md={5} xs={12}>
                        <StyledTextField
                            fullWidth
                            select
                            value={qualification}
                            label="Qualification"
                            onChange={e => { setQualification(e.target.value) }}
                        >
                            <MenuItem value="10th Pass">10th Pass</MenuItem>
                            <MenuItem value="12th Pass">12th Pass</MenuItem>
                            <MenuItem value="Graduate">Graduate</MenuItem>
                            <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                        </StyledTextField>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <StyledTextField value={pinCode} onChange={e => { setPinCode(e.target.value) }} fullWidth sx={{ mb: 3 }} label='PIN Code' />
                    </Grid>
                </Grid>
                <Button sx={{ minWidth: 100, mr: 3, background: "#7b1fa2", "&:hover": { background: "#ab47bc" } }} size='large' variant='contained'>Let's Go</Button>
                <Button sx={{ minWidth: 100 }} size='large' variant='outlined' color='error'>Clear</Button>

            </ Container>
        </ BackgroundBox >
    )
}

export default BuildProfile