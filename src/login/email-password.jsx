import React from 'react';
import {
  autobind,
  TextField,
  Button,
  ButtonType,
  Label
} from 'office-ui-fabric-react';


export const actions = {
  login: 'loginform:emailpass:login'
};

/*
  EmailPassword Combination
  paramaters
    # if true, login button is disabled
    disabled: boolean
    # callback thats given the action
    dispatch: ({}) => { action: actions.login, { email, password } } 


*/
export const EmailPasswordLoginForm = ({dispatch, disabled, formData}) => {
  const action = {
    type: 'loginform:emailpass:login',
    data: {
      email: formData.email,
      password: formData.password
    }
  }
  const dispatchAction = (e) => {
    e.preventDefault();
    if (!disabled) {
      dispatch(action);
    }
  }
  return (
    <div>
      <form>
        <TextField label='Email' value={formData.email} name="email" placeholder='bdobbs@example.com' ariaLabel='Please enter text here' />
        <TextField label='Password' value={formData.password} type="password" name="value" placeholder='bdobbs@example.com' ariaLabel='Please enter text here' />
        <Button
          data-automation-id='test'
          disabled={ disabled }
          buttonType={ ButtonType.primary }
          onClick={() => {  }}
        >
          Create account
        </Button>
      </form>
    </div>
  );
};


export class EmailPasswordLoginFormBehavior extends React.Component {

};

