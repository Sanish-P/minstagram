import React from 'react';
import styled from 'styled-components';
import { ShadowWrapper } from './Header';
import { useNavigate } from 'react-router-dom';

const FooterWrapper = styled(ShadowWrapper)`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  background: white;
`
const Link = styled.a`
  font-size: 25px;
  text-decoration: none;
  color: black;
  padding: 20px 0;
  width: 100%;
  text-align: center;
`

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); return navigate(path); }
  return (
    <FooterWrapper className="footer">
      <Link href="/" onClick={handleClick('/')}>🏠</Link>
      <Link href="/post" onClick={handleClick('/post')}>📷</Link>
      <Link href="/profile" onClick={handleClick('/profile')}>😎</Link>
    </FooterWrapper>
  );
};

export default Footer;