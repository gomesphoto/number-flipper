import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { colors } from './styles';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(${colors.dark});
`;

class App extends Component {
  state = {
    target: 10
  }
  render() {
    return (
      <StyledWrapper>
        <Card target={this.state.target} />
      </StyledWrapper>
    );
  }
}

export default App;
