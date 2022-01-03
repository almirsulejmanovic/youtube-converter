import React, { createContext, useState } from 'react';
import axios from 'axios';
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [video, setVideo] = useState([]);


  const getVideo = async (query) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&q=${query}&safeSearch=none&key=${API_KEY}`);
      setVideo(response.data.items);
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <AppContext.Provider value={{ video, getVideo }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;

