import { AppBar, Toolbar, Typography, styled, Badge, Avatar, Menu, MenuItem, Divider, Button } from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Box } from '@mui/system';
import { Notifications } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: "center",
  minHeight: '60px',
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
  const [isLogin, setIsLogin] = useState(true);


  return (
    <AppBar position='sticky' color='default'>
      <StyledToolbar>
        <Typography variant='h5'>SiteName</Typography>

        {!isLogin ? (
          <Button
            variant='text'
            sx={{ backgroundColor: '#e3f2fd', '&:hover': { background: "#bbdefb" } }}
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
                  sx={{ width: 35, height: 35 }}
                  onClick={e => setMenu(true)}
                >
                  M
                </Avatar>
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
                  <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/profile'>
                    <MenuItem><AccountCircleRoundedIcon fontSize="small" sx={{ mr: 2 }} />
                      Profile
                    </MenuItem>
                  </Link>

                  <Link style={{ color: 'inherit', textDecoration: 'none' }} to='dashboard'>
                    <MenuItem><SettingsRoundedIcon fontSize="small" sx={{ mr: 2 }} />
                      Dashboard
                    </MenuItem>
                  </Link>

                  <Divider />
                  
                  <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/'>
                    <MenuItem><LogoutRoundedIcon fontSize="small" sx={{ mr: 2 }} />
                      Logout
                    </MenuItem>
                  </Link>
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