import { AppBar, Toolbar, Typography, styled, Badge, Avatar, Menu, MenuItem, Divider, Button } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Box } from '@mui/system';
import { Notifications } from '@mui/icons-material';
import { useState } from 'react';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: "center",
  backgroundColor: '#673ab7',
});

const Icons = styled(Box)(({ theme }) => ({
  gap: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: 'center'
}))

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}))

const Navbar = () => {

  const [menu, setMenu] = useState(false);

  return (
    <AppBar position='fixed'>
      <StyledToolbar>
        <Typography variant='h6'>SiteName</Typography>
        <Icons>
          <Badge badgeContent={2} color='error'>
            <Notifications />
          </Badge>

          {/* <ButtonBox> */}
          <Button size='small' variant='outlined' color='info'>Sign Up</Button>
          {/* </ButtonBox> */}
          <UserBox>
            <Avatar
              src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg'
              sx={{ width: 35, height: 35 }}
              onClick={e => setMenu(true)}
            />

            <Menu
              id='positioned-menu'
              aria-labelledby='positioned-menu'
              open={menu}
              onClose={e => setMenu(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
              <MenuItem><AccountCircleRoundedIcon fontSize="small" sx={{ mr: 2 }} />Profile</MenuItem>
              <MenuItem><SettingsRoundedIcon fontSize="small" sx={{ mr: 2 }} />Settings</MenuItem>
              <Divider />
              <MenuItem><LogoutRoundedIcon fontSize="small" sx={{ mr: 2 }} />Logout</MenuItem>

            </Menu>
            <Typography variant='subtitle1' sx={{ display: { xs: "none", sm: "block" } }}>John</Typography>
          </UserBox>

        </Icons>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar