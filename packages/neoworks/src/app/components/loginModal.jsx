import * as React from 'react';
import {
  Button,
  SpaceBetween,
  Modal,
  Box,
} from '@cloudscape-design/components';

export function LoginModal(props) {
  const [visible, setVisible] = React.useState(false);
  console.log('clicked login');
  const showModal = props.showLogin;
  if (showModal) {
    setVisible(true);
    console.log(showModal);
  }

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      closeAriaLabel="Close modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link">Cancel</Button>
            <Button variant="primary">Ok</Button>
          </SpaceBetween>
        </Box>
      }
      header="Modal title"
    ></Modal>
  );
}
