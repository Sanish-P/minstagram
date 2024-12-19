import React from 'react';

import { useForm } from 'react-hook-form';
import { InputWrapper, FormWrapper, Input, ErrorSpan } from './LoginForm';
import { FormTypes, ICommonFormProps } from '../Login';
import axiosInstance from 'src/utils/axios';

interface ISignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

type SignUpFormProps = ICommonFormProps;

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const { register, handleSubmit, errors, getValues } = useForm<ISignUpFormValues>()
  const onSubmit = async ({ email, password}: ISignUpFormValues) => {
    try {
      await axiosInstance.post('/v1/users', {
        email,
        password
      })
      props.onFormChange(FormTypes.login)
    } catch (error) {
      throw error;
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputWrapper>
          <Input placeholder="Type your email" name="email" ref={register({ required: "This is required"})} autoComplete="off" />
          {errors.email && <ErrorSpan>{errors.email.message}</ErrorSpan>}
        </InputWrapper>
        <InputWrapper>
          <Input type="password" placeholder="Type your pasword" name="password" ref={register({ required: "This is required"})} autoComplete="off" />
          {errors.password && <ErrorSpan>{errors.password.message}</ErrorSpan>}
        </InputWrapper>
        <div>
          <Input type="password" placeholder="Confirm password" name="confirmPassword" ref={register({ required: "This is required", validate: { sameValues: value => value === getValues().password}} )} autoComplete="off" />
          {errors.confirmPassword && <ErrorSpan>{errors.confirmPassword.message ? errors.confirmPassword.message : 'Passwords not same'}</ErrorSpan>}
        </div>
      </div>
      <div>
        <button type="submit" >SignUp</button>
      </div>
        <span>Or <a style={{ cursor: 'pointer'}} onClick={() => props.onFormChange(FormTypes.login)}>Login</a></span>
    </FormWrapper>
  );
};

export default SignUpForm;