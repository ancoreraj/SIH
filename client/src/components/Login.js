import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

const Login = () => {
    return (
        <Stack sx={{ maxWidth: "1300px", margin: '1rem auto'}} direction={"row"} justifyContent={"space-between"} >
            <Box sx={{ flex: 1 }}>Image Box</Box>
            <Box sx={{ flex: 1 }}>Login Form</Box>
        </Stack>
    )
}

export default Login