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
  perspective: 1000px;
`;

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 1s;
  background: rgb(${colors.white});
  transition: ${transitions.long};
  transform: rotateX(${({ invert }) => invert ? '180deg' : 0});
`;

const StyledCardContent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  font-size: 140px;
  color: rgb(${colors.dark});
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateX(${({ invert }) => invert ? '180deg' : 0});

`;

const StyledCardFront = styled(StyledCardContent)`
  background: white;
`;

const StyledCardBack = styled(StyledCardContent)`
  transform: rotateX(180deg);
`;

class App extends Component {
  state = {
    invert: false
  }
  render() {
    return (
      <StyledWrapper>
        <StyledCardContainer>
          <StyledCard invert={this.state.invert} onClick={() => this.setState({ invert: !this.state.invert })}>
            <StyledCardFront>1</StyledCardFront>
            <StyledCardBack>2</StyledCardBack>
          </StyledCard>
        </StyledCardContainer>
      </StyledWrapper>
    );
  }
}

export default App;
