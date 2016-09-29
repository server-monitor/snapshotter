// TODO: to lint, refactor, etc.
// Still uses modal but not strict modal (shouldCloseOnOverlayClick = false)

import React from 'react';
import Modal from 'react-modal';
import TimerMixin from 'react-timer-mixin';

import { buildMessageElement } from './helpers';

// Modal.setAppElement('#app');

export const MessageBox = React.createClass({
  mixins: [TimerMixin],
  componentDidMount() {
    const { closeModalAfterMS } = this.props;
    if (closeModalAfterMS) {
      this.setTimeout(
        () => { this.closeModal(); },

        closeModalAfterMS
      );
    }
  },

  propTypes: {
    messageClass: React.PropTypes.string,
    message: React.PropTypes.string,
    messageList: React.PropTypes.array,
  },

  getInitialState() {
    return { modalIsOpen: true };
  },

  closeModal() {
    this.setState({ modalIsOpen: false });
  },

  render() {
    const { messageClass, header, message, messageList } = this.props;

    let messageElement = buildMessageElement(message, messageList);

    // https://github.com/reactjs/react-modal
    let modalContentStyle = {
      overlay: {
        zIndex: 4, // !!IMPORTANT!!

        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        // backgroundColor: 'rgba(10, 10, 10, 0.70)',
      },

      content: {
        left: '20%',
        right: '20%',
        bottom: '50%',
        background: 'rgba(10, 10, 10, 0.80)',
      },
    };

    return (
      <Modal

        // shouldCloseOnOverlayClick={ false }
        isOpen={ this.state.modalIsOpen }
        onRequestClose={ this.closeModal }
        style={ modalContentStyle }
      >
        <div className={ 'ui ' + messageClass + ' message'}>
          <i onClick={ this.closeModal } className="close icon"></i>
          <div className="header">{ header }</div>
          { messageElement }
        </div>
      </Modal>
    );
  },
});

export default MessageBox;
