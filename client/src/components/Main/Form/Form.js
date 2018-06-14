import React, { Component } from 'react';
import { Select, Form, Button } from 'semantic-ui-react';
import Input from './Input';


class FormControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {configLang} = this.props;
    const options = [
      {key: 'm', text: configLang.gender.male, value: 'male'},
      {key: 'f', text: configLang.gender.female, value: 'female'},
    ];
    return (
      <div className='FormBox'>
        <Form className='Form' size='mini'>
          <Input label={ configLang.name } placeHolder={ configLang.name }/>
          <Input label={ configLang.surname } placeHolder={ configLang.surname }/>
          <Input label={ configLang.middle } placeHolder={ configLang.middle }/>
          <Input label={ configLang.email } placeHolder={ configLang.email }/>
          <Form.Field
            control={ Select }
            label={ configLang.gender.title }
            options={ options }
            placeholder={ configLang.gender.title }
          />
          <Input label={ configLang.age } placeHolder={ configLang.age }/>
          <div className='buttonBox'>
            <Input
              type='file'
              label={ configLang.file }
              placeHolder={ configLang.file }
              className='uploadFile'
            />
            <Button fluid icon='download' className='dowLand'/>
          </div>
            <Button fluid color='blue' size='small'>
              {configLang.button}
            </Button>
        </Form>
      </div>
    )
  }
}

export default FormControl;
