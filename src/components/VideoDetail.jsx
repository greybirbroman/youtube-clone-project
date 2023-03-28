import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { Videos } from './';
import { fetchFromApi } from '../utils/fetchFromAPI';
import { CheckCircle } from '@mui/icons-material';

function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0]) // Запрашиваем видео по которому кликнули чтобы посмотреть в плеере
    ); ///////// Показываем только первое видео в ReactPlayer

    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data) => setRelatedVideos(data.items)) // Запрашиваем рекомендуемые видео для Сайдбара
  }, [id]);

  if(!videoDetail?.snippet) return 'Loading...'

const { snippet: { title, channelId, channelTitle}, statistics: {viewCount, likeCount}} = videoDetail;

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '85px' }}>
            <ReactPlayer
              url={`http://www.youtube.com/watch?v=${id}`}
              className='react-player'
              controls
            />
            <Typography color='#fff' variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack direction='row' justifyContent='space-between' sx={{
              color: '#fff',
            }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm: 'subtitle1', md: 'h6'}} color='#fff' fontFamily='sans-serif'>
                  {channelTitle}
                  <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}} />
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{opacity: 0.7}}>
                  {parseInt(viewCount).toLocaleString('en-US')} views
                </Typography>
                <Typography variant='body1' sx={{opacity: 0.7}}>
                  {parseInt(likeCount).toLocaleString('en-US')} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      <Box px={2} py={{md: 2, xs: 5}} justifyContent='center' alignItems='center'>
            <Videos videos={relatedVideos} direction='column'/>
      </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;
