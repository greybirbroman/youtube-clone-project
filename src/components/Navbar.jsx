import React from 'react'
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo } from '../utils/constants'
import SearchBar from './SearchBar';

function Navbar() {
  return (
   <Stack
   direction='row'
   alignItems='center'
   p={2}
   sx={{
    position: 'sticky',
    background: '#000',
    top: 0,
    justifyContent: 'space-between'
   }}
   >
    <Link to='/' className='flex items-center'>
      <img src={logo} alt='logo' style={{height: '45px'}} />
    </Link>
    <SearchBar />
   </Stack>
  )
}

export default Navbar
