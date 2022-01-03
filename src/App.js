import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Tabs, Tab } from 'react-bootstrap'
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import URL from './components/URL';
import Info from './components/Info'
import AppContextProvider from './contexts/AppContext';

export default function App() {

  return (
    <div className='app'>
      <AppContextProvider>
        <Tabs defaultActiveKey='search'>
          <Tab eventKey='search' title='Search'>
            <SearchBar />
            <VideoList />
          </Tab>
          <Tab eventKey='url' title='URL'>
            <URL />
          </Tab>
        </Tabs>
        <Info />
      </AppContextProvider>
    </div>
  );
}