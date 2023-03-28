import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Videos } from './'; // Берем из components './' потому что мы уже в этой папке;
import { fetchFromApi } from '../utils/fetchFromAPI';

function SearchFeed() {
 
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams()
  console.log(searchTerm)

  useEffect(() => {
    fetchFromApi(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchTerm]);

  return (
    <Box //// CONTAINER FOR VIDEOS
      p={2}
      sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}
    >
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color: 'white' }}>
        Search Results for: <span style={{ color: '#f31503' }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
}

export default SearchFeed;
