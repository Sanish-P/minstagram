import React, { useContext } from "react";
import { PrivateRouterContext } from "../Router";
import styled from "styled-components";
import Upload from "src/components/common/Upload";
import axiosInstance from "src/utils/axios";

const ProfileImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 50px;
`;

const UserDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface IUserDetailsProps {
  email: string;
  profileUrl: string;
  disabled?: boolean;
}

const UserDetails: React.FC<IUserDetailsProps> = ({
  email,
  profileUrl,
  disabled = true,
}) => {
  const { fetchProfile } = useContext(PrivateRouterContext);
  const handleUploadComplete = async (profileId: string) => {
    await axiosInstance.patch("/v1/users/me", {
      profileId,
    });
    await fetchProfile();
  };
  return (
    <UserDetailsWrapper>
      {profileUrl ? (
        <ProfileImage src={profileUrl} />
      ) : !disabled ? (
        <Upload
          onUploadComplete={handleUploadComplete}
          maxHeight={100}
          maxWidth={100}
        />
      ) : null}
      <span>{email}</span>
    </UserDetailsWrapper>
  );
};

export default UserDetails;
