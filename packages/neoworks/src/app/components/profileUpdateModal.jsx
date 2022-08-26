import * as React from 'react';
import {
  Modal,
  HelpPanel,
  Container,
  Box,
  SpaceBetween,
  Button,
} from '@cloudscape-design/components';

export function UpdateProfileModal(props) {
  console.log(props);
  const submitUpdateProfile = () => {
    alert('Profile Updated');
  };

  const cancelUpdateProfile = () => {
    window.location.reload(false);
  };
  return (
    <Modal
      visible={props.open}
      onDismiss={props.close}
      closeAriaLabel="Close modal"
      header="Order Confirmed"
    >
      <Container>
        <HelpPanel
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xxs">
                <Button onClick={cancelUpdateProfile} variant="link">
                  Close
                </Button>
                <Button onClick={submitUpdateProfile} variant="primary">
                  Submit Order
                </Button>
              </SpaceBetween>
            </Box>
          }
        >
          <div>
            <ul>
              <h5>You have successfully updated your Profile</h5>
            </ul>
          </div>
        </HelpPanel>
      </Container>
    </Modal>
  );
}

export default UpdateProfileModal;
