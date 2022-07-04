import {
  Box,
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import registerImg from "../components/assets/img/register.png";

const BackgroundBox = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  maxWidth: 200,
  [theme.breakpoints.down("sm")]: {
    maxWidth: 300,
  },
  "& label.Mui-focused": {
    color: "#7b1fa2",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7b1fa2",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#7b1fa2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7b1fa2",
    },
  },
}));

const validate = (title, applylink, qualification, date) => {
  const errors = {};
  const NameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  if (!title) {
    errors.title = "Enter Title";
  } else if (!NameRegex.test(title.trim())) {
    errors.title = ` Title can't contain numbers and special characters`;
  }
  if (!applylink) {
    errors.applyLink = "Enter Apply Link";
  }

  if (date == null) {
    errors.date = "Select your Birth Date";
  }

  if (!qualification) {
    errors.qualification = "Select your Qualification";
  }

  return errors;
};

const CreateJob = () => {
  const [date, setDate] = useState(null);
  const [qualification, setQualification] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [title, setTitle] = useState("");
  const [applyLink, setApplyLink] = useState("");

  const handleClear = () => {
    setDate(null);
    setQualification("");
    setFormErrors({});
    setTitle("");
    setApplyLink("");
  };

  const handleSubmit = () => {
    const errors = validate(title, applyLink, qualification, date);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const apiData = {
        title,
        applyLink,
        qualification,
        date: format(date, "dd-MM-yyyy"),
      };

      console.log(apiData);
      handleClear();
    }
  };

  return (
    <BackgroundBox>
      <Grid container>
        <Grid container item xs={12} lg={8} md={7} sx={{ px: 0 }}>
          <img
            src={registerImg}
            alt="pm"
            style={{
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Grid>
        <Grid container item xs={12} lg={4} md={5}>
          <Box
            component={Paper}
            elevation={3}
            sx={{
              minHeight: "100%",
              px: 6,
              width: "100%",
            }}
          >
            <Box sx={{ py: 4 }}>
              <Box sx={{ mb: 5 }}>
                <Typography variant="h4" sx={{ mb: 1, color: "#212121" }}>
                  Create a Job
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#7b1fa2" }}>
                  Create a Job to continue.
                </Typography>
              </Box>

              <StyledTextField
                sx={{ mr: 2, mb: 3 }}
                size="small"
                value={title}
                error={Boolean(formErrors.title)}
                helperText={formErrors.title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                fullWidth
                label="Title"
              />
              <StyledTextField
                sx={{ minWidth: "300px", mb: 4 }}
                size="small"
                value={applyLink}
                error={Boolean(formErrors.applyLink)}
                helperText={formErrors.applyLink}
                onChange={(e) => {
                  setApplyLink(e.target.value);
                }}
                fullWidth
                label="Apply Link"
              />
              <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Last Date"
                  inputFormat="dd-MM-yyyy"
                  value={date}
                  onChange={(newDate) => {
                    setDate(newDate);
                  }}
                  openTo="year"
                  views={["year", "month", "day"]}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      sx={{ minWidth: "300px" }}
                      {...params}
                    />
                  )}
                />

                <FormHelperText sx={{ color: "#d32f2f", mb: 3 }}>
                  {formErrors.date}
                </FormHelperText>
              </LocalizationProvider>
              <StyledTextField
                fullWidth
                select
                sx={{ minWidth: "300px", mb: 3 }}
                size="small"
                value={qualification}
                label="Qualification"
                onChange={(e) => {
                  setQualification(e.target.value);
                }}
                helperText={formErrors.qualification}
                error={Boolean(formErrors.qualification)}
              >
                <MenuItem value="10th Pass">10th Pass</MenuItem>
                <MenuItem value="12th Pass">12th Pass</MenuItem>
                <MenuItem value="Graduate">Graduate</MenuItem>
                <MenuItem value="Post Graduate">Post Graduate</MenuItem>
              </StyledTextField>
              <br />
              <Button
                onClick={handleSubmit}
                sx={{
                  minWidth: 100,
                  mr: 3,
                  background: "#7b1fa2",
                  "&:hover": { background: "#ab47bc" },
                }}
                size="large"
                variant="contained"
              >
                Let's Go
              </Button>
              <Button
                onClick={handleClear}
                sx={{ minWidth: 100 }}
                size="large"
                variant="outlined"
                color="error"
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </BackgroundBox>
  );
};

export default CreateJob;
