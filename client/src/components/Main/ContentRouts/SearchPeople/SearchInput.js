import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchInput = ( {eventSearch, configLang} ) =>{
  return (
    <Input
      fluid
      icon='search'
      className='search_input'
      placeholder={configLang.placeHolderSearch}
      onChange={ eventSearch }
      iconPosition='left'/> )
};

export default SearchInput;