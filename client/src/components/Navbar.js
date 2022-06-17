import { AppBar, Toolbar, Typography, styled, Badge, Avatar, Menu, MenuItem, Divider, Button } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Box } from '@mui/system';
import { Notifications } from '@mui/icons-material';
import { useState } from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: "center",
  [theme.breakpoints.up('sm')]: {
    margin: "0 3rem"
  }
}));

const Icons = styled(Box)(({ theme }) => ({
  gap: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: 'center'
}))

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  justifyContent: 'center',
  alignItems: "center",
}))

const Navbar = () => {

  const [menu, setMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);


  return (
    <AppBar position='sticky' color='default'>
      <StyledToolbar>
        <Typography variant='h5'>SiteName</Typography>
        {!isLogin ? (
          <Button
            variant='contained'
            onClick={e => setIsLogin(!isLogin)}
          >
            Sign Up
          </Button>
        )
          : (
            < Icons >
              <Badge badgeContent={2} color='error'>
                <Notifications />
              </Badge>
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
              </UserBox>
            </Icons>
          )
        }
      </StyledToolbar >
    </AppBar >
  )
}

export default Navbar