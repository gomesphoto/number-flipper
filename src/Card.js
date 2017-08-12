import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { colors, transitions } from './styles';

const flip = keyframes`
  0% { transform: rotateX(0); }
  100% { transform: rotateX(-180deg); }
`;

const invert = keyframes`
  0% { transform: rotateX(180deg); }
  100% { transform: rotateX(0); }
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
  z-index: 2;
  border-radius: 10px 10px 0 0;
  animation: ${flip} 0.5s ease-in-out;
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
  animation: ${flip} 0.5s ease-in-out;
`;

const StyledCardFront = styled(StyledCardContent)`
  background: white;
`;

const StyledCardBack = styled(StyledCardContent)`
  transition: ${transitions.long};
  animation: ${invert} 0.5s ease-in-out;
`;

let interval;

class Card extends Component {
  state = {
    current: 1
  }
  increment = () => {
    if (this.state.current >= this.props.target) return clearInterval(interval);
    this.setState({ current: this.state.current + 1 });
  }
  componentDidMount() {
    interval = setInterval(this.increment, 700);
  }
  render() {
    const { ...otherProps } = this.props;
    return (
      <StyledCardContainer {...otherProps}>
        <StyledCardTop>
          <StyledCardFront>{this.state.current}</StyledCardFront>
        </StyledCardTop>
        <StyledCardTop>
          <StyledCardFront>{this.state.current - 1}</StyledCardFront>
        </StyledCardTop>
        <StyledCardBottom>
          <StyledCardFront>{this.state.current - 1}</StyledCardFront>
          <StyledCardBack>{this.state.current}</StyledCardBack>
        </StyledCardBottom>
      </StyledCardContainer>
    );
  }
}

Card.propTypes = {
  target: PropTypes.number.isRequired
}

export default Card;
