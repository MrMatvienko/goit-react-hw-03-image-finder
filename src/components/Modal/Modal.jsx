import { Component } from 'react';
import { ModalContent, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <Overlay className="overlay">
        <ModalContent className="modal">
          <img src="" alt="" />
        </ModalContent>
      </Overlay>
    );
  }
}
