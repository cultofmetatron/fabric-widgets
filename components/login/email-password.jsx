import React from 'react';
import {
  TextField,
  Button,
  ButtonType,
  Label,
  Spinner,
  SpinnerType
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

//TODO: move this to somewhere else #allValidatorsMatter
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
  const {dispatch, disabled, formData, pending=false} = props
  const errors = props.errors || {}; //default
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
    debugger
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

  const onValidation = (field, error, value) => {
    dispatch({
      type: actions.change,
      data: {
        field: field,
        prevValue: formData[field],
        newValue: value
      }
    })
  }
  const registerValidator = (field) =>
    (error, value) => onValidation(field, error, value)

  return (
    <div>
      <form>
          <div>
            <TextField 
              label='Email'
              value={formData.email}
              name="email"
              required
              disabled={pending}
              placeholder='bdobbs@example.com'
              ariaLabel='Please enter text here'
              onGetErrorMessage={handleErrors('email', errors)}
              onChanged={registerChange('email')}
              onNotifyValidationResult={registerValidator('email')}
            />
            <TextField 
              label='Password'
              value={formData.password}
              type="password"
              name="value"
              required
              disabled={pending}
              placeholder='Place your password here'
              ariaLabel='Password'
              onGetErrorMessage={handleErrors('password', errors)}
              onChanged={registerChange('password')}
              onNotifyValidationResult={registerValidator('password')}
            />
            <Button
              data-automation-id='test'
              disabled={ disabled }
              buttonType={ ButtonType.primary }
              onClick={dispatchAction}
            >
              <i className="ms-Icon ms-Icon--Mail" aria-hidden="true"></i>
              {(!pending) ? 'Create Account' : 'Signing In' }
            </Button>
          </div>
      </form>
    </div>
  )
};

