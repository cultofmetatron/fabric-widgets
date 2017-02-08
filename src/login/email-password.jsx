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

function handleErrors(field, errors) {
  return (str) => (errors[field]) ? (errors[field] || 'undefined error') : '';
}

/*
  emails start with an alphanumeric charachetr
  exactly one '@'
  have at least one '.' on the left side
*/
function validEmail(email) {
  const split1 = email.split('@');
  if (split.length != 2) {
    return false
  } else {
    //must have at least one . on the right half
    if (split[1].split('.') > 1) {
      return true;
    } else {
      return false;
    }
  }
}

function addEmailValidation(formData, errors) {
  if (validEmail(formData.email)) {
    return errors
  } else {
    errors.email = "Invalid email";
    return errors;
  }
}
/*
  EmailPassword Combination
  paramaters
    # if true, login button is disabled
    disabled: boolean
    # callback thats given the action
    dispatch: ({}) => { action: actions.login, { email, password } } 

*/
export const EmailPasswordLoginForm = (props) => {
  const {dispatch, disabled, formData, notices} = props
  const errors = props.errors || {}; //default
  const action = {
    type: actions.login,
    data: {
      email: formData.email,
      password: formData.password
    }
  };
  const dispatchAction = (e) => {
    e.preventDefault();
    if (!disabled) {
      dispatch(action);
    }
  };
  

  return (
    <div>
      <form>
        <TextField 
          label='Email'
          value={formData.email}
          name="email"
          placeholder='bdobbs@example.com'
          ariaLabel='Please enter text here'
          onGetErrorMessage={handleErrors('email', errors)}
        />
        <TextField 
          label='Password'
          value={formData.password}
          type="password"
          name="value"
          placeholder='Place your password here'
          ariaLabel='Password'
          onGetErrorMessage={handleErrors('password', errors)}
        />
        <Button
          data-automation-id='test'
          disabled={ disabled }
          buttonType={ ButtonType.primary }
          onClick={dispatchAction}
        >
          Create account
        </Button>
      </form>
    </div>
  )
};

