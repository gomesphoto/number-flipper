import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, transitions } from './styles';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(${colors.dark});
`;

const StyledCardContainer = styled.div`
  width: 200px;
  height: 300px;
  perspective: 500px;
`;

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  background: rgb(${colors.white});
  transition: ${transitions.long};
`;

const StyledCardTop = styled(StyledCard)`
  height: 50%;
  overflow: hidden;
  transform: rotateX(${({ invert }) => invert ? '-180deg' : 0});
  transform-origin: bottom;
  & > div {
    background: red;
  }
`;

const StyledCardBottom = styled(StyledCard)`
  height: 50%;
  overflow: hidden;
  bottom: 0;
  z-index: -1;
  & > div {
    background: blue;
    top: -100%;
  }
`;

const StyledCardContent = styled.div`
  width: 100%;
  height: 200%;
  position: absolute;
  font-size: 160px;
  color: rgb(${colors.dark});
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateX(${({ invert }) => invert ? '-180deg' : 0});
`;

const StyledCardFront = styled(StyledCardContent)`
  background: white;
`;

const StyledCardBack = styled(StyledCardContent)`
  transition: ${transitions.long};
  transform: rotateX(${({ invert }) => invert ? 0 : '-180deg'});
`;

class App extends Component {
  state = {
    invert: false
  }
  render() {
    return (
      <StyledWrapper>
        <StyledCardContainer onClick={() => this.setState({ invert: !this.state.invert })}>
          <StyledCardTop>
            <StyledCardFront>2</StyledCardFront>
          </StyledCardTop>
          <StyledCardTop invert={this.state.invert}>
            <StyledCardFront>1</StyledCardFront>
            <StyledCardBack invert={this.state.invert}>2</StyledCardBack>
          </StyledCardTop>
          <StyledCardBottom invert={this.state.invert}>
            <StyledCardFront>1</StyledCardFront>
          </StyledCardBottom>
        </StyledCardContainer>
      </StyledWrapper>
    );
  }
}

export default App;
