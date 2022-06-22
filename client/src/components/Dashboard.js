import {
  FormControl,
  InputAdornment, InputLabel, MenuItem,
  Select, Grid, TextField, LinearProgress,
  Paper, TableContainer, TableHead, TableCell,
  TableRow, TableBody, Table, Box, Typography, Divider, Button, Tooltip
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useEffect } from 'react'
import Row from './DataRow';
import { styled } from '@mui/material/styles'

const data = [
  {
    date: "12/02/2022",
    name: "Electrical Engineer",
    description: "It's a job for software development. It's a job for software development It's a job for software development",
    link: "Apply Here"
  },
  {
    date: "12/02/2022",
    name: "Software Engineer",
    description: "It's a job for software development. It's a job for software development It's a job for software development",
    link: "Apply Here"
  },
  {
    date: "12/02/2022",
    name: "Software Engineer",
    description: "It's a job for software development. It's a job for software development It's a job for software development",
    link: "Apply Here"
  },
  {
    date: "12/02/2022",
    name: "Software Engineer",
    description: "It's a job for software development. It's a job for software development It's a job for software development",
    link: "Apply Here"
  },
  {
    date: "12/02/2022",
    name: "Software Engineer",
    description: "It's a job for software development. It's a job for software development It's a job for software development",
    link: "Apply Here"
  },
  {
    date: "12/02/2022",
    name: "Software Engineer",
    description: "It's a job for software development. It's a job for software development It's a job for software development",
    link: "Apply Here"
  },
  {
    date: "12/02/2022",
    name: "Software Engineer",
    description: "It's a job for software development. It's a job for software development It's a job for software development",
    link: "Apply Here"
  },
  {
    date: "12/02/2000",
    name: "Software Engineer",
    description: "It's a job for software development. It's a job for software development It's a job for software development",
    link: "Apply Here"
  }
]

const StyledBox = styled(Paper)(({ theme }) => ({
  flex: "2",
  minHeight: "calc(100vh - 69px)",
  padding: '0 1.5rem',
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down('md')]: {
    display: "none",
  }
}))

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down('md')]: {
    display: "flex",
  }
}))

const Dashboard = () => {

  const [qualification, setQualification] = useState("");
  const [age, setAge] = useState("");
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]); // to store jobs data fetched through API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    /* 
      API CODE HERE
    */
    setJobs(data); // dummy data

    setLoading(false)

  }, [])

  const handleSearch = () => {
    return jobs.filter(
      (job) =>
        job.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleClear = () => {
    setAge(null);
    setQualification(null);
  }

  const handleApply = () => {
    // Filters Logic Here
  }

  const handleAge = (e) => {
    setAge(e.target.value)
  }


  return (
    <>
      <Box gap={0} sx={{ display: 'flex', justifyContent: "center", background: "#eeeeee", p: 2 }}>
        <StyledBox elevation={1}>
          <Typography sx={{ mt: 2, mb: 1 }} variant='h6' textTransform='uppercase' >
            Filters
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box>
            <FormControl fullWidth sx={{ mb: 2, mr: 3 }}>
              <InputLabel id="demo-select-small">Qualification</InputLabel>
              <Select
                value={qualification}
                label="Qualification"
                onChange={e => { setQualification(e.target.value) }}
                fullWidth
              >
                <MenuItem value="10th Pass">10th Pass</MenuItem>
                <MenuItem value="12th Pass">12th Pass</MenuItem>
                <MenuItem value="Graduate">Graduate</MenuItem>
                <MenuItem value="Post Graduate">Post Graduate</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth type="text" sx={{ mb: 3 }} value={age} onChange={handleAge} label="Filter by Age" />

            <Tooltip title="Apply Filters">
              <Button onClick={handleApply} startIcon={<DoneIcon />} variant="contained" color='success' sx={{ mr: 3 }}>Apply</Button>
            </Tooltip>

            <Tooltip title="Clear All Filters">
              <Button onClick={handleClear} startIcon={<ClearIcon />} variant="outlined" color='error'>Clear</Button>
            </Tooltip>

            <Typography sx={{ mt: 4, mb: 1 }} variant='h6' textTransform='uppercase'>
              Statistics
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Typography fontStyle='bold' component='div' variant="body1">
              Total Jobs:&nbsp;{data.length}
            </Typography>

          </Box>
        </ StyledBox>

        <Box disableGutters sx={{
          minHeight: "calc(100vh - 69px)",
          py: 0, px: 1,
          flex: "10",
          maxWidth: "1200px"
        }}>

          <Grid container component={Paper} elevation={1} sx={{
            display: "flex",
            justifyContent: 'space-between',
            flexDirection: "row",
            mb: 2, p: 2,
          }}>

            <StyledGrid item>
              <FormControl sx={{ mb: 2, mr: 3, minWidth: '160px' }}>
                <InputLabel id="demo-select-small">Qualification</InputLabel>
                <Select
                  size='small'
                  value={qualification}
                  label="Qualification"
                  onChange={e => { setQualification(e.target.value) }}
                  fullWidth
                >
                  <MenuItem value="10th Pass">10th Pass</MenuItem>
                  <MenuItem value="12th Pass">12th Pass</MenuItem>
                  <MenuItem value="Graduate">Graduate</MenuItem>
                  <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                </Select>
              </FormControl>
              <TextField size='small' value={age} onChange={handleAge} label="Filter by Age" />
            </StyledGrid>

            <Grid item xs={12} sx={{ background: "#fff" }}>
              <TextField
                fullWidth
                size='small'
                value={search}
                onChange={e => setSearch(e.target.value)}
                label="Search"
                InputProps={{
                  endAdornment: <InputAdornment position="end"><SearchOutlinedIcon /></InputAdornment>,
                }}
              />
            </Grid>
          </Grid>

          {
            loading ? (
              <LinearProgress sx={{ my: 1 }} />
            )
              :
              (
                <TableContainer component={Paper} elevation={2}>
                  <Table>
                    <TableHead sx={{ background: "#eee" }}>
                      <TableRow sx={{ textTransform: 'uppercase' }}>
                        <TableCell>Date</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Link</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {
                        handleSearch().map((job, index) => {
                          return (
                            <Row key={index} job={job} />
                          )
                        })
                      }
                    </TableBody>

                  </Table>
                </TableContainer>
              )
          }
        </ Box >
      </Box >
    </>
  )
}

export default Dashboard