import * as React from 'react';
import {
  Modal,
  Box,
  SpaceBetween,
  Button,
} from '@cloudscape-design/components';

export function TradeModal(props) {
  //   const [visible, setVisible] = React.useState(false);
  //   console.log('modal');
  return (
    <Modal
      //   onDismiss={() => setVisible(false)}
      //   visible={visible}
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
    >
      Your description should go here
    </Modal>
  );
}

export default TradeModal;
