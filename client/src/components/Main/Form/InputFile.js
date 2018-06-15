import React from 'react';
import Files from 'react-files';


const InputFileSize = () => {
  const onFilesChange = files => {
    console.log ( files );
  };

  return (
    <div className='blockInputFileSize'>
      <Files
        onChange={ onFilesChange }
        accepts={[ 'image/png' ]}
        multiple
        maxFiles={3}
        maxFileSize={5000000}
        minFileSize={40}
        clickable
        className='inputFileSize'
      />
    </div>
  )
};

export default InputFileSize;