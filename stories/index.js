import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import { EmailPasswordLoginForm } from '../components/login/email-password';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('UserPasswordLoginForm', module)
  .add('basic login', () => {
    const dispatch = (val) => {
      console.log(val);
      action(val.type)
    };
    const disabled = false;
    const formData = {
      email: "bdobbs@example.com",
      password: "slackulous"
    }
    const notices = [];
    return (
      <EmailPasswordLoginForm 
        dispatch={dispatch}
        disabled={disabled}
        formData={formData}
      />
    );
  })
  .add('error state', () => {
    const dispatch = (val) => {
      console.log(val);
      action(val.type)
    };
    const disabled = true;
    const formData = {
      email: "bdobbs",
      password: "slackulous"
    }
    const errors = {
      'password': 'wrong password',
      'email':'invalid email format'
    }
    return (
      <EmailPasswordLoginForm 
        dispatch={action('login-pass')}
        disabled={disabled}
        formData={formData}
        errors={errors}
      />
    );
  });

