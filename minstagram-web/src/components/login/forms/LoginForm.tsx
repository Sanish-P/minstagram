import React from "react";

import styled from "styled-components";
import { useForm } from "react-hook-form";
import { handleLogin } from "src/utils/auth";
import { FormTypes, ICommonFormProps } from "../Login";
import { useNavigate } from "react-router-dom";

export const FormWrapper = styled.form`
  display: grid;
  grid-row-gap: 20px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 23px;
`;
export const Input = styled.input`
  line-height: 1.2;
  height: 35px;
  font-size: 16px;
  display: block;
  padding: 0 7px 0 43px;
`;

export const ErrorSpan = styled.span`
  color: red;
`;

interface ILoginFormValues {
  email: string;
  password: string;
}

type ILoginFormProps = ICommonFormProps;

const LoginForm: React.FC<ILoginFormProps> = (props) => {
  const { register, handleSubmit, errors, setError } = useForm<ILoginFormValues>();
  const navigate = useNavigate();
  const onSubmit = async (credentials: ILoginFormValues) => {
    try {
      await handleLogin(credentials);
      navigate("/");
    } catch (error) {
      setError("email", 'invalid', 'Invalid email or password');
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputWrapper>
          <Input
            placeholder="Type your email"
            name="email"
            ref={register({ required: true })}
            autoComplete="off"
          />
          {errors.email && <ErrorSpan>{errors.email?.message}</ErrorSpan>}
        </InputWrapper>
        <div>
          <Input
            type="password"
            placeholder="Type your password"
            name="password"
            ref={register({ required: true })}
            autoComplete="off"
          />
          {errors.password && <ErrorSpan>{errors.password?.message}</ErrorSpan>}
        </div>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <span>
        Or{" "}
        <button
          type="button"
          onClick={() => props.onFormChange(FormTypes.signup)}
        >
          Sign Up
        </button>
      </span>
    </FormWrapper>
  );
};

export default LoginForm;
