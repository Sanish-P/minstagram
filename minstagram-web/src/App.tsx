import React from 'react';
import styled from 'styled-components';
import AppRouter from './components/Router';

import 'public/assets/favs/favicon-32x32.png';

const AppSection = styled.div`
  width: 100%;
  height: 100vh;
`

const App: React.FC = () => (
  <AppSection>
    <AppRouter />
  </AppSection>
);

export default App;