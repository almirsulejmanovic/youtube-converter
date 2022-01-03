import React, { useState } from 'react';
import { Card, Row, Col, Button, ProgressBar } from 'react-bootstrap'
import axios from 'axios';
import he from 'he';

const VideoDetails = ({ video }) => {
  const serverURL = 'localhost:4000'
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`;
  const downloadSrc = `http://www.youtube.com/watch?v=${video.id.videoId}`;
  const [isMP3Loading, setMP3Loading] = useState(false);
  const [isMP4Loading, setMP4Loading] = useState(false);
  const [MP3Progress, setMP3Progress] = useState(0);
  const [MP4Progress, setMP4Progress] = useState(0);
  const [showIFrame, setShowIFrame] = useState(false)


  const downloadmp3 = async () => {
    setMP3Loading(true);
    try {
      const response = await axios.get(`${serverURL}/downloadmp3?url=${downloadSrc}`, {
        onDownloadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
          console.log('onDownloadProgress', totalLength);
          if (totalLength !== null) {
            setMP3Progress(Math.round((progressEvent.loaded * 100) / totalLength));
          }
        }
      });
      if (response.status === 200) {
        var a = document.createElement('a');
        a.href = `${serverURL}/downloadmp3?url=${downloadSrc}`;
        a.setAttribute('download', '');
        a.click();
        setMP3Loading(false);
      } else if (response.status === 400) {
        alert('Invalid URL');
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const downloadmp4 = async () => {
    setMP4Loading(true);
    try {
      const response = await axios.get(`${serverURL}/downloadmp3?url=${downloadSrc}`, {
        onDownloadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
          console.log('onDownloadProgress', totalLength);
          if (totalLength !== null) {
            setMP4Progress(Math.round((progressEvent.loaded * 100) / totalLength));
          }
        }
      });
      if (response.status === 200) {
        var a = document.createElement('a');
        a.href = `${serverURL}/downloadmp4?url=${downloadSrc}`;
        a.setAttribute('download', '');
        a.click();
        setMP4Loading(false);
      } else if (response.status === 400) {
        alert('Invalid URL');
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <li className='video-details'>
      <Card>
        <Card.Header as={'h5'}>
          {he.decode(video.snippet.title)}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <div className='embed-responsive embed-responsive-16by9' onClick={() => setShowIFrame(true)}>
                {showIFrame ?
                  <iframe title='Video Player' className='embed-responsive-item' name='Video Player' src={videoSrc}></iframe> :
                  <img
                    className='embed-responsive-item'
                    style={{ cursor: 'pointer' }}
                    alt='Video Thumbnail'
                    src={video.snippet.thumbnails.high.url}
                  />}
              </div>
            </Col>
            <Col md={4} className='download-column download-border'>
              <div className='download-button-div'>
                <div className='download-progress'>
                  <Button
                    block
                    variant='light'
                    className='text-nowrap download-button'
                    disabled={isMP3Loading || MP3Progress === 100}
                    onClick={!isMP3Loading ? downloadmp3 : null} >
                    {isMP3Loading ? 'Converting...' : 'Download MP3'}
                  </Button>
                  <ProgressBar now={MP3Progress} />
                </div>

                <div className='download-progress'>
                  <Button
                    block
                    variant='light'
                    className='text-nowrap download-button'
                    disabled={isMP4Loading || MP4Progress === 100}
                    onClick={!isMP4Loading ? downloadmp4 : null} >
                    {isMP4Loading ? 'Converting...' : 'Download MP4'}
                  </Button>
                  <ProgressBar now={MP4Progress} />
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </li>
  )
}

export default VideoDetails;