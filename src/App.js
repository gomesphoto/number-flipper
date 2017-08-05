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
  border-radius: 10px 10px 0 0;
  transform: rotateX(${({ invert }) => invert ? '-180deg' : 0});
  transform-origin: bottom;
  & > div {
    background: white;
  }
`;

const StyledCardBottom = styled(StyledCard)`
  height: 50%;
  overflow: hidden;
  border-radius: 0 0 10px 10px;
  border-top: 2px solid black;
  bottom: 0;
  & > div {
    background: white;
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
  transform-style: preserve-3d;
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
  transform: rotateX(${({ invert }) => invert ? 0 : '180deg'});
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
          </StyledCardTop>
          <StyledCardBottom invert={this.state.invert}>
            <StyledCardFront>1</StyledCardFront>
            <StyledCardBack invert={this.state.invert}>2</StyledCardBack>
          </StyledCardBottom>
        </StyledCardContainer>
      </StyledWrapper>
    );
  }
}

export default App;
