import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import { EmailPasswordLoginForm } from '../src/login/email-password';

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
  .add('basic form', () => {
    const dispatch = () => {};
    const disabled = false;
    const formData = {
      email: "bdobbs@example.com",
      password: "slackulous"
    }
    return (
      <EmailPasswordLoginForm 
        dispatch={dispatch}
        disabled={disabled}
        formData={formData}
      />
    );
  });

