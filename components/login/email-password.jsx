import React from 'react';
import {
  TextField,
  Button,
  ButtonType,
  Label
} from 'office-ui-fabric-react';

export const actions = {
  login: 'loginform:emailpass:login',
  change: 'loginform:emailpass:change'
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
  if (email.length == 0) {
    return true;
  }
  const split = email.split('@');
  if (split.length != 2) {
    return false
  } else {
    //must have at least one . on the right half
    if (split[1].split('.').length > 1) {
      return true;
    } else {
      return false;
    }
  }
}

function addEmailValidation(formData, errors) {
  const email = formData.email || '';
  if (validEmail(email)) {
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
  const errors = addEmailValidation(formData, props.errors || {}); //default
  const loginAction = {
    type: actions.login,
    data: {
      email: formData.email,
      password: formData.password
    }
  };
  const dispatchAction = (e) => {
    e.preventDefault();
    if (!disabled) {
      dispatch(loginAction);
    }
  };
  //dispatches a change action
  const onChange = (field, value) => {
    dispatch({
      type: actions.change,
      data: {
        field: field,
        prevValue: formData[field],
        newValue: value
      }
    })
  }
  const registerChange = (field) =>
    (value) => onChange(field, value)

  return (
    <div>
      <form>
        <TextField 
          label='Email'
          value={formData.email}
          name="email"
          required
          placeholder='bdobbs@example.com'
          ariaLabel='Please enter text here'
          onGetErrorMessage={handleErrors('email', errors)}
          onChanged={registerChange('email')}
          underlined
        />
        <TextField 
          label='Password'
          value={formData.password}
          type="password"
          name="value"
          required
          placeholder='Place your password here'
          ariaLabel='Password'
          onGetErrorMessage={handleErrors('password', errors)}
          underlined
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

