import React, { useState, useEffect, useRef } from "react";

import axiosInstance from "src/utils/axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface IUser {
  id: string;
  email: string;
  profileUrl: string;
}

const UserList = styled.ul`
  position: absolute;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  margin: 0;
  padding: 0;
  background: white;
`;
const UserListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr;
  cursor: pointer;
`;

const UserProfileImage = styled.img`
  margin: 16px;
  max-width: 44px;
  border-radius: 22px;
`;

const EmailWrapper = styled.span`
  margin: 16px auto;
  padding: 10px 0;
`;

const Search = styled.input`
  padding: 12px 40px 12px 15px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 25px;
`;

const Stalk: React.FC = () => {
  const initialMount = useRef(true);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isListVisible, setIsListVisible] = useState(false);
  const [userList, setUserList] = useState<Array<IUser>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.currentTarget.value);
  };

  const fetchUserList = async () => {
    const userList: Array<IUser> = await axiosInstance
      .get("/v1/users", {
        params: {
          search: searchTerm,
        },
      })
      .then(({ data }) => data)
      .catch((error) => {
        throw error;
      });
    setUserList(userList);
  };

  useEffect(() => {
    if (!initialMount.current) {
      fetchUserList();
    }
  }, [searchTerm]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (wrapperRef.current) {
      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsListVisible(false);
      }
    }
  };

  useEffect(() => {
    if (initialMount.current) {
      document.addEventListener("click", handleOutsideClick);
      initialMount.current = false;
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleFocus = () => {
    setIsListVisible(true);
  };

  const handleUserSelection =
    (id: string) => (event: React.MouseEvent<HTMLLIElement>) => {
      navigate(`/users/${id}`);
      setIsListVisible(false);
    };

  return (
    <div ref={wrapperRef}>
      <Search
        className="search"
        placeholder="Want to stalk"
        value={searchTerm}
        onChange={handleSearchTermChange}
        onFocus={handleFocus}
      />
      {isListVisible ? (
        <UserList>
          <>
            {userList.map(({ email, profileUrl, id }) => (
              <UserListItem key={id} onClick={handleUserSelection(id)}>
                <UserProfileImage src={profileUrl} />
                <EmailWrapper>{email}</EmailWrapper>
              </UserListItem>
            ))}
          </>
        </UserList>
      ) : null}
    </div>
  );
};

export default Stalk;
