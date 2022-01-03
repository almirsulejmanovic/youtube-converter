import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormControl, Button, ProgressBar, Alert } from 'react-bootstrap';

const URL = () => {
  const serverURL = 'localhost:4000'
  const [query, setQuery] = useState('');
  const [isMP3Loading, setMP3Loading] = useState(false);
  const [isMP4Loading, setMP4Loading] = useState(false);
  const [MP3Progress, setMP3Progress] = useState(0);
  const [MP4Progress, setMP4Progress] = useState(0);
  const [showError400, setShowError400] = useState(false);

  const Error400 = () => {
    if (showError400) {
      return (
        <Alert variant='danger' style={{ textAlign: 'center' }} onClose={() => setShowError400(false)} dismissible>
          <Alert.Heading>You have entered an invalid YouTube URL</Alert.Heading>
          <p>
            Please enter a valid YouTube URL and try again
          </p>
        </Alert>
      );
    }
    else {
      return null;
    }
  }

  const downloadmp3 = async () => {
    setMP3Loading(true);
    try {
      const response = await axios.get(`${serverURL}/downloadmp3?url=${query}`, {
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
        a.href = `${serverURL}/downloadmp3?url=${query}`;
        a.setAttribute('download', '');
        a.click();
        setMP3Loading(false);
      }
    }
    catch (error) {
      if (error.response.status === 400) {
        setShowError400(true);
        setQuery('');
        setMP3Loading(false);
        setMP3Progress(0);
      }
    }
  }

  const downloadmp4 = async () => {
    setMP4Loading(true);
    try {
      const response = await axios.get(`${serverURL}/downloadmp3?url=${query}`, {
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
        a.href = `${serverURL}/downloadmp4?url=${query}`;
        a.setAttribute('download', '');
        a.click();
        setMP4Loading(false);
      }
    }
    catch (error) {
      if (error.response.status === 400) {
        setShowError400(true);
        setQuery('');
        setMP4Loading(false);
        setMP4Progress(0);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='search-div'>
      <Error400 />
      <div className='p-1 bg-light rounded rounded-pill shadow-sm mb-4'>
        <Form onSubmit={handleSubmit}>
          <FormControl
            type='search'
            placeholder='Enter YouTube URL...'
            className='border-0 bg-light'
            value={query}
            onChange={(e) => { setQuery(e.target.value); setMP3Progress(0); setMP4Progress(0); setShowError400(false) }}
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = 'Enter YouTube URL...'}
          >
          </FormControl>
        </Form>
      </div>

      <div className='url-download-div'>
        <div className='download-progress'>
          <Button
            block
            variant='light'
            className='text-nowrap download-button'
            disabled={isMP3Loading || query.length === 0 || MP3Progress === 100}
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
            disabled={isMP4Loading || query.length === 0 || MP4Progress === 100}
            onClick={!isMP4Loading ? downloadmp4 : null} >
            {isMP4Loading ? 'Converting...' : 'Download MP4'}
          </Button>
          <ProgressBar now={MP4Progress} />
        </div>
      </div>
    </div>
  )
}

export default URL;