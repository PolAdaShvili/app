import React,{ Component } from 'react';
import axios from 'axios';
import { Select,Form,Button } from 'semantic-ui-react';
import { regExp } from '../../../constants';
import Input from './Input';

class FormControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      first:'',surname:'',middle:'',email:'',gender:'',age:'',photo:''
    };
    this.clickRegister = this.clickRegister.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    FormControl.handlerSelect = FormControl.handlerSelect.bind(this);
  }

  static handlerInputFile(e){
    const elem = e.target.parentNode.nextSibling;
    elem.innerText = 'Photo upload';
    elem.style.backgroundColor = '#2185d0';
    console.log(e.target.parentNode.nextSibling);
  }
  static validate(regExp,name,value){
    return regExp[name].test(value);
  }
  static validateName(regExp,name,value){
    return (value.search(regExp.name) !== - 1);
  }
  static handlerSelect(e){
    if(e.target.children[0].innerText){
      this.setState({gender:e.target.children[0].innerText});
      e.target.classList.remove('err');
    }else{
      this.setState({gender:e.target.children[0].innerText});
      e.target.classList.add('err');
    }
  }

  handlerInput(e){
    const {type,value,name} = e.target;
    if(type === 'text' && name !== 'age'){
      if(FormControl.validateName(regExp,name,value)){
        this.setState({[name]:value});
        e.target.classList.remove('err');
        //console.log(this.state)
      }else{
        e.target.classList.add('err');
      }
    }else{
      if(FormControl.validate(regExp,name,value)){
        this.setState({[name]:value});
        e.target.classList.remove('err');
      }else{
        e.target.classList.add('err');
      }
    }
  }

  clickRegister(e){
    let requiredFields = Object.keys(this.state).filter(field => field !== 'photo' && field !== 'middle' );
    const result = requiredFields.map(field => {
      return this.state[field];
    });
    let errForm = result.every((item) => {
      if(item) {
        return true;
      }
    });

    console.log(errForm, requiredFields);

    if(errForm){
      e.preventDefault();
      console.log(this.state);
      const data = this.state;
      axios({
        method: 'post',
        url: 'http://localhost:3001/user',
        data: {
          data
        }
      }).then(res => {
        console.log(res);
      })
    }

  };

  render(){
    const {configLang} = this.props;
    const options = [{
      key:'m',text:configLang.gender.male,value:'male'
    },{
      key:'f',text:configLang.gender.female,value:'female'
    }];
    const onPhotoChange = () =>{
      const file = this.fileUpload.files[0];
      if(file.size > 40 && file.size < 5000){
        console.log('file dow')
      }else{
        console.log('file err size')
      }
      console.log(file);
    };
    return (<div className='FormBox'>
      <Form className='Form' size='mini' onSubmit={this.testSend}>
        <Input
          label={configLang.name}
          name='first'
          placeHolder={configLang.name}
          onChange={this.handlerInput}
        />
        <Input
          name='surname'
          label={configLang.surname}
          placeHolder={configLang.surname}
          onChange={this.handlerInput}
        />
        <Form.Group widths={2}>
          <Form.Field
            control={Select}
            name='gender'
            required={true}
            label={configLang.gender.title}
            options={options}
            onChange={FormControl.handlerSelect}
            placeholder={configLang.gender.title}
          />
          <Input
            name='age'
            type='number'
            label={configLang.age}
            placeHolder={configLang.age}
            onChange={this.handlerInput}
          />
        </Form.Group>
        <Input
          name='middle'
          required={false}
          label={configLang.middle}
          placeHolder={configLang.middle}
          onChange={this.handlerInput}
        />
        <Input
          name='email'
          type='email'
          label={configLang.email}
          placeHolder={configLang.email}
          onChange={this.handlerInput}
        />
      </Form>
      <form className='buttonBox' encType="multipart/form-data">
        <Button fluid icon='download' className='dowLand'/>
        <input
          type="file"
          onChange={onPhotoChange}
          ref={(ref) => this.fileUpload = ref}
          accept=".png, .jpg, .jpeg"
        />
      </form>
      <Button
        type='submit'
        fluid color='blue'
        size='small'
        onClick={this.clickRegister}
      >
        {configLang.button}
      </Button>
      <form onSubmit={this.clickRegister.bind(this)}/>
    </div>)
  }
}

export default FormControl;
