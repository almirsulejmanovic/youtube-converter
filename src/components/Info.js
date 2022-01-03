import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const Info = () => {
  const { video } = useContext(AppContext);
  return video.length ? (
    null
  ) : (
    <div className='text-white'>
      <h1 className='pt-5 text-center'>YouTube Converter</h1>
      <h4 className='pt-3 text-center'>Convert and download YouTube videos</h4>
      <p className='pt-3 text-center'>By using this converter you can easily convert YouTube videos to mp3 (audio) or mp4 (video) files and download them for free - this service works for computers, tablets and mobile devices. </p>
      <div className='pt-3 d-flex justify-content-center'>
        <div className='d-inline-block'>
          <span className=''>To convert a video: </span>
          <ul>
            <li>Search for the YouTube video you want to convert</li>
            <li>Click the appropriate download button</li>
            <li>As soon as the conversion is finished, the download should start automatically </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Info;
