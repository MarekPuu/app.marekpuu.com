import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React from 'react';

const ProfilePage = () => {
  const { user } = useAuth0();

  const initials = `${user?.given_name?.[0]!}${user?.family_name?.[0]!}`;

  console.log(user);

  return (
    <Box
      sx={{
        padding: '100px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        className="colorGrey"
        sx={{
          position: 'relative',
          margin: 'auto',
          width: '90%',
          maxWidth: '500px',
          paddingBottom: '30px',
        }}
        elevation={3}
      >
        <Avatar
          className="MenuItemSecondaryBg"
          sx={{
            position: 'absolute',
            right: '50%',
            top: '0',
            transform: 'translate(50%,-50%)',
            width: '150px',
            height: '150px',
          }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        >
          <Typography variant="h2" component="p" sx={{ color: 'white' }}>
            {initials}
          </Typography>
        </Avatar>
        <Box sx={{ paddingTop: '100px', marginBottom: '50px' }}>
          <Typography
            fontWeight={500}
            variant="h4"
            component="p"
            sx={{ textAlign: 'center' }}
          >
            {`${user?.given_name} ${user?.family_name}`}
          </Typography>
        </Box>

        <Box
          sx={{
            padding: '0 50px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography color="black" fontWeight={500}>
              Sähköposti
            </Typography>
            <Typography>{user?.email}</Typography>
          </Box>
          <Box>
            <Typography color="black" fontWeight={500}>
              Salasana
            </Typography>
            <Typography>********</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '20px',
            padding: '0 50px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography color="black" fontWeight={500}>
              Kirjautumistapa
            </Typography>
            <Typography>{user?.sub?.split('|')[0]}</Typography>
          </Box>
          <Box sx={{ width: '100%', paddingLeft: '20px' }}>
            <Typography textAlign="right" color="black" fontWeight={500}>
              Oletustalous
            </Typography>
            <Typography textAlign="right">asdseweqwewqewqe </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
