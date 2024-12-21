import React, { useRef, useState } from "react";
import styled from "styled-components";
import axiosInstance from "src/utils/axios";

const uploadFile = async (uploadFile: FormData) => {
  const { id }: { id: string } = await axiosInstance
    .post("/v1/upload", uploadFile)
    .then(({ data }) => data)

  return id;
};

interface IUploadProps {
  maxWidth?: number;
  maxHeight?: number;
  onUploadComplete: (uploadedId: string) => void;
}

const Upload: React.FC<IUploadProps> = (props) => {
  const uploadInput = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleClick = () => {
    const uploadInputRef = uploadInput.current;
    if (uploadInputRef) {
      uploadInputRef.click();
    }
  };
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      try {
        const fileToUpload = files.item(0);
        if (fileToUpload) {
          const formData = new FormData();
          formData.append("upload", fileToUpload);
          const resourceId = await uploadFile(formData);
          props.onUploadComplete(resourceId);
        }
        const filePreview = URL.createObjectURL(files[0]);
        setImagePreview(filePreview);
      } catch (error) {}
    }
  };
  const ImagePreview = styled.img`
    min-width: 60px;
    min-height: 60px;
    max-width: ${props.maxWidth ? `${props.maxWidth}px` : "300px"};
    max-height: ${props.maxHeight ? `${props.maxHeight}px` : "300px"};
  `;
  return (
    <div>
      {imagePreview ? (
        <ImagePreview src={imagePreview} />
      ) : (
        <>
          <button type="button" onClick={handleClick}>
            Upload
          </button>
          <input
            accept="image/*"
            ref={uploadInput}
            style={{ display: "none" }}
            onChange={handleChange}
            type="file"
          />
        </>
      )}
    </div>
  );
};

export default Upload;
