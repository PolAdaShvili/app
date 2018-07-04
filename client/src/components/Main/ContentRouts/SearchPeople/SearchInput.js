import React from 'react';
import { Segment, Input } from 'semantic-ui-react';


const SearchInput = ({ eventSearch }) => (
    <Input
      fluid
      icon='search'
      className='search_input'
      placeholder='Search...'
      onChange={ eventSearch }
      iconPosition='left'
    />
);

export default SearchInput;