import React, { useContext } from 'react';

import UserDetails from './UserDetails';
import PostCollage from './PostCollage';
import { PrivateRouterContext } from '../Router';
import Layout from 'src/components/common/Layout';

const Profile = () => {
  const { profile: { posts, email, profileUrl } } = useContext(PrivateRouterContext);
  return (
    <Layout className='profile'>
      <UserDetails disabled={false} email={email} profileUrl={profileUrl} />
      <PostCollage posts={posts} />
    </Layout>
  );
};

export default Profile;