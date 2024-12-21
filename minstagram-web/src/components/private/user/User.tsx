import React, { useState, useEffect } from "react";

import UserDetails from "../profile/UserDetails";
import PostCollage from "../profile/PostCollage";
import { IProfile } from "src/components/private/Router";
import axiosInstance from "src/utils/axios";
import { useParams } from "react-router-dom";
import Layout from "src/components/common/Layout";

const User = () => {
  const [user, setUser] = useState<IProfile | null>(null);
  const params = useParams();
  const userId = params.userId;

  const fetchUser = async (userId?: string) => {
    if (userId) {
      const fetchedUser: IProfile = await axiosInstance
        .get(`/v1/users/${userId}`)
        .then(({ data }) => data);

      setUser(fetchedUser);
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, [fetchUser, userId]);

  return user ? (
    <Layout className="user">
      <UserDetails disabled email={user.email} profileUrl={user.profileUrl} />
      <PostCollage posts={user.posts} />
    </Layout>
  ) : null;
};

export default User;
