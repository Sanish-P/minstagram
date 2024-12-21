import React, { useState } from 'react';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: grid;
`

const FormWrapper = styled.div`
  margin: 40px auto;
  padding: 2em;
  background: white;
  display: grid;
  grid-row-gap: 20px;
`

export enum FormTypes {
  login = 'login',
  signup = 'signup'
}

export interface ICommonFormProps {
  onFormChange: (formType: FormTypes) => void;
}

const Login: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<FormTypes>(FormTypes.login);
  const handleFormChange = (selectedForm: FormTypes) => {
    setCurrentForm(selectedForm)
  }
  return (
    <LoginWrapper>
      <FormWrapper>
        <span>
          Login
      </span>
      {currentForm === FormTypes.login ? <LoginForm onFormChange={handleFormChange} /> : <SignUpForm onFormChange={handleFormChange} />}
      </FormWrapper>
      <div />
      <div />
    </LoginWrapper>
  );
};

export default Login;