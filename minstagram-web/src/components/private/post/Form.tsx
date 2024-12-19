import React from "react";

import styled from "styled-components";
import { useForm } from "react-hook-form";

import axiosInstance from "src/utils/axios";
import Upload from "src/components/common/Upload";
import {
  InputWrapper,
  FormWrapper,
  ErrorSpan,
} from "src/components/login/forms/LoginForm";
import { useNavigate } from "react-router-dom";

interface IPostFormValues {
  caption: string;
  imageId: string;
}

export const Input = styled.input`
  line-height: 1.2;
  height: 35px;
  font-size: 16px;
  display: block;
  width: 100%;
`;

const CreatePostForm: React.FC = () => {
  const { register, handleSubmit, errors, setValue } =
    useForm<IPostFormValues>();
  register({ name: "imageId" }, { required: true });
  const navigate = useNavigate();

  const onSubmit = async ({ caption, imageId }: IPostFormValues) => {
    await axiosInstance.post("/v1/posts", {
      caption,
      imageId,
    });
    navigate("/");
  };

  const handleUpload = (uploadedId: string) => {
    setValue("imageId", uploadedId);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputWrapper>
          <Upload
            maxHeight={400}
            maxWidth={400}
            onUploadComplete={handleUpload}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="Type the best caption or copy from somewhere"
            name="caption"
            ref={register({ required: "This is required" })}
            autoComplete="off"
          />
          {errors.caption && <ErrorSpan>{errors.caption.message}</ErrorSpan>}
        </InputWrapper>
      </div>
      <div style={{ textAlign: "center" }}>
        <button type="submit">Bazinga!!!</button>
      </div>
    </FormWrapper>
  );
};

export default CreatePostForm;
