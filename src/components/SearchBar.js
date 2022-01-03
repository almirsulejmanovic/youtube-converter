import React, { useContext, useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../contexts/AppContext';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { getVideo } = useContext(AppContext);


  const handleSubmit = (e) => {
    e.preventDefault(e);
    getVideo(query);
    setQuery('');
  }

  return (
    <div className='search-div'>
      <div className='p-1 bg-light rounded rounded-pill shadow-sm mb-4'>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <FormControl
              type='search'
              placeholder='Search YouTube...'
              className='border-0 bg-light'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={(e) => e.target.placeholder = ''}
              onBlur={(e) => e.target.placeholder = 'Search YouTube...'}
            >
            </FormControl>
            <InputGroup.Append>
              <Button
                type='submit'
                variant='link'
                className='text-primary search-button'
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}

export default SearchBar;