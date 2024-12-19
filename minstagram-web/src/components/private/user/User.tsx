import React, { useState, useEffect } from "react";

import UserDetails from "../profile/UserDetails";
import PostCollage from "../profile/PostCollage";
import { ProfileWrapper } from "../profile/Profile";
import { IProfile } from "src/components/private/Router";
import axiosInstance from "src/utils/axios";
import { useParams } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState<IProfile | null>(null);
  const params = useParams();
  const userId = params.userId;

  const fetchUser = async (userId?: string) => {
    if (userId) {
      const fetchedUser: IProfile = await axiosInstance
        .get(`/v1/users/${userId}`)
        .then(({ data }) => data)
        .catch((error) => {
          throw error;
        });
      setUser(fetchedUser);
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, [fetchUser, userId]);

  return user ? (
    <ProfileWrapper>
      <UserDetails disabled email={user.email} profileUrl={user.profileUrl} />
      <PostCollage posts={user.posts} />
    </ProfileWrapper>
  ) : null;
};

export default User;
