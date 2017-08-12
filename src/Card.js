import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  transition: ${({ invert, interval }) => invert ? `all ${interval}ms ease-in-out` : 'none'};
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
  transition: ${({ invert, interval }) => invert ? `all ${interval}ms ease-in-out` : 'none'};
  transform: rotateX(${({ invert }) => invert ? 0 : '180deg'});
`;

let interval;

class Card extends Component {
  state = {
    invert: false,
    next: 1,
    current: 0,
    interval: this.props.interval
  }
  componentDidMount() {
    interval = setInterval(this.animate, this.state.interval + 100);
  }
  animate = () => {
    if (this.state.current >= this.props.target) return clearInterval(interval);
    this.setState({ invert: !this.state.invert });
    setTimeout(() => this.setState({
      invert: !this.state.invert,
      current: this.state.next,
      next: this.state.next + 1
    }), this.state.interval);
  }
  render() {
    return (
      <StyledWrapper>
        <StyledCardContainer onClick={this.animate}>
          <StyledCardTop>
            <StyledCardFront>{this.state.next}</StyledCardFront>
          </StyledCardTop>
          <StyledCardTop
            interval={this.state.interval}
            invert={this.state.invert}
          >
            <StyledCardFront>{this.state.current}</StyledCardFront>
          </StyledCardTop>
          <StyledCardBottom
            interval={this.state.interval}
            invert={this.state.invert}
          >
            <StyledCardFront>{this.state.current}</StyledCardFront>
            <StyledCardBack
              interval={this.state.interval}
              invert={this.state.invert}
            >
              {this.state.next}
            </StyledCardBack>
          </StyledCardBottom>
        </StyledCardContainer>
      </StyledWrapper>
    );
  }
}

Card.propTypes = {
  interval: PropTypes.number,
  target: PropTypes.number
};

Card.defaultProps = {
  interval: 500,
  target: 10
}

export default Card;
