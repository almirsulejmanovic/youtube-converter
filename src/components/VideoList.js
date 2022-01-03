import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import VideoDetails from './VideoDetails';

const VideoList = () => {
  const { video } = useContext(AppContext);
  return (
    <div>
      <ul className='video-list'>
        {video.map(video => {
          return (<VideoDetails video={video} key={video.id.videoId} />);
        })}
      </ul>
    </div>
  )
}

export default VideoList;