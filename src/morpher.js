import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';
import { getBounds, getBoundedPositions } from './utils';
import { handlePropsErrors } from './handlePropsErrors';
import './styles.css';

export default class Morpher extends Component {
  constructor(props) {
    handlePropsErrors(props);
    super();

    this.state = {
      x: 0,
      y: 0,
      isResizing: false,
      // we assume height and width exists because we throw errors if not
      height: props.children.props.style.height,
      width: props.children.props.style.width,
      ratio: props.children.props.style.width / props.children.props.style.height,
    }
  }

  handleResizing = (e, data) => {
    console.log('resizing');
    console.log('e', e);
    console.log('data', data);
    const { deltaY, deltaX } = data;
    if (deltaY === 0) {
      this.setState({
        width: this.state.width + deltaX,
        height: Math.floor(this.state.width + deltaX / this.state.ratio),
      })
      return;
    }
    this.setState({
      height: this.state.height + deltaY,
      width: Math.floor(this.state.height + deltaY * this.state.ratio),
    })
    // console.log('computed styles', getComputedStyle(e.target));
    // const elemHeight = e.target.offsetHeight;
    // const elemWidth = e.target.offsetWidth;
  }


  onStart = (e, data) => {
    console.log('onStart fired');
    this.bounds = getBounds(e.target);
    const isResizing = e.target.classList.contains('resize-handle');
    // const height = e.target.offsetHeight;
    // const width = e.target.offsetWidth;
    // console.log('height', height);
    // console.log('width', width);
    this.setState({
      isResizing,
      // height: this.state.height + deltaY,
      // width: this.state.width + deltaX,
      // height,
      // width,
    })
  }

  onDrag = (e, data) => {
    console.log('onDrag', e);
    console.log('data', data);
    console.log('classes contains?', e.target.classList.contains('bob'));
    // const isResizing = e.target.classList.contains('resize-handle');
    console.log('is resizing', this.state.isResizing);
    if (this.state.isResizing) {
      this.handleResizing(e, data);
      return;
    }
    // if (!this.bounds) {
    //   this.bounds = getBounds(e.target);
    //   console.log('this.bounds', this.bounds);
    // }
    const { deltaY, deltaX } = data;
    const positionX = this.state.x + deltaX;
    const positionY = this.state.y + deltaY;
    const { x, y } = getBoundedPositions(this.bounds, positionX, positionY);
    console.log('x', x);
    console.log('y', y);
    // getBounds(e.target, positionX, positionY)
    this.setState({
      x,
      y
    });
  }

  onStop = () => {
    console.log('onStop fired');
    this.setState({
      isResizing: false,
    })
  }

  addSpan = (element) => {
    const elemChildren = element.props.children;
    if (!elemChildren) {
      return (
        <span></span>
      )
    }
    if (Array.isArray(elemChildren)) {
      return [...elemChildren, <span></span>];
    }
    return [elemChildren, <span className='resize-handle'></span>];
  }

  renderElement = () => {
    const { x, y, height, width } = this.state;
    console.log('height', height);
    console.log('width', width);
    const childElement = this.props.children;
    const { children, ...elemProps } = childElement;
    console.log('childElement', childElement);

    return React.cloneElement(childElement, {
      style: {
        ...childElement.props.style,
        height,
        width,
        backgroundColor: 'blue',
        transform: `translate(${x}px, ${y}px)`,
      },
      children: this.addSpan(childElement)
    })
  }

  render() {
    console.log('this.props', this.props);
    const childProps = this.props.children.props;
    return (
      <DraggableCore
        onStop={this.onStop}
        onStart={this.onStart}
        onDrag={this.onDrag}
      >
        <div style={{ height: childProps.style.height, width: childProps.style.width, backgroundColor: 'pink'}}>
          {this.renderElement()}
        </div>
        {/* <div className='blue' style={{height: 200, width: 200, backgroundColor: 'lightblue', transform: `translate(${x}px, ${y}px)` }}>
            <div className='red' style={{height: 50, width: 50, backgroundColor: 'red'}}></div>
        </div> */}
      </DraggableCore>
    )
  }
}
