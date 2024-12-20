import React, { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Home from "./home/Home";
import CreatePost from "./post/Post";
import axiosInstance from "src/utils/axios";
import Profile from "./profile/Profile";
import { IPost } from "./home/Post";
import { IReaction } from "./home/Reactions";
import styled from "styled-components";
import User from "./user/User";

export interface IProfile {
  id: string;
  email: string;
  profileUrl: string;
  posts: Array<IPost>;
}

const initialState = {
  id: "",
  email: "",
  profileUrl: "",
  posts: [],
};

interface IPrivateRouterContext {
  profile: IProfile;
  fetchProfile: () => Promise<void>;
}

export const PrivateRouterContext = createContext<IPrivateRouterContext>({
  profile: {} as IProfile,
  fetchProfile: () =>
    new Promise((resolve) => {
      resolve();
    }),
});

interface IReactionsContext {
  reactions: Array<IReaction>;
  fetchReactions: () => Promise<void>;
}

export const ReactionsContext = createContext<IReactionsContext>({
  reactions: [],
  fetchReactions: () =>
    new Promise((resolve) => {
      resolve();
    }),
});

const PrivateRouter: React.FC = () => {
  const [profile, setProfile] = useState<IProfile>(initialState);
  const [reactions, setReactions] = useState<Array<IReaction>>([]);

  const fetchProfile = async () => {
    const profile: IProfile = await axiosInstance
      .get("/v1/users/me")
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
    setProfile(profile);
  };

  const fetchReactions = async () => {
    try {
      const reactions: Array<IReaction> = await axiosInstance
        .get("/v1/reactions")
        .then(({ data }) => data)
        .catch((error) => {
          throw error;
        });
      setReactions(reactions);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchReactions();
  }, []);

  const PrivateRoutesWrapper = styled.div`
    margin: 80px 0;
  `;

  return (
    <PrivateRouterContext.Provider value={{ profile, fetchProfile }}>
      <Header />
      <PrivateRoutesWrapper>
        <Routes>
          <Route path="/post" element={<CreatePost />} />
        </Routes>
        <ReactionsContext.Provider value={{ reactions, fetchReactions }}>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </ReactionsContext.Provider>
      </PrivateRoutesWrapper>
      <Footer />
    </PrivateRouterContext.Provider>
  );
};

export default PrivateRouter;
