import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Post, { IPost } from "./Post";
import axiosInstance from "src/utils/axios";
import Layout from "src/components/common/Layout";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const fetchPostList = async () => {
    const postList: Array<IPost> = await axiosInstance
      .get("/v1/posts")
      .then(({ data }) => data);

    setPosts(postList);
  };
  const handleReactionChange = () => {
    fetchPostList();
  };
  useEffect(() => {
    fetchPostList();
  }, []);
  return (
    <Layout className="home">
      {posts.map((post) => (
        <Post
          onReactionChange={handleReactionChange}
          key={post.id}
          post={post}
        />
      ))}
    </Layout>
  );
};

export default Home;
