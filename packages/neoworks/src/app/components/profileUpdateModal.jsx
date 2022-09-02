import * as React from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../context/profileContext';
import {
  Modal,
  SpaceBetween,
  Container,
  Input,
  FormField,
  Form,
  Button,
  HelpPanel,
  Box,
} from '@cloudscape-design/components';

export function PureUpdateProfileModal({
  submitUpdateProfile,
  userProfile,
  handlePreviewSubmit,
  setProfileUserName,
  setProfileName,
  setUpdatePreview,
  updatePreview,
  cancelUpdateProfile,
  closeModal,
  props,
}) {
  return (
    <Modal
      visible={props.open}
      onDismiss={closeModal}
      closeAriaLabel="Close modal"
      header="Update your Profile"
    >
      {updatePreview ? (
        <Container>
          <form onSubmit={handlePreviewSubmit}>
            <Form
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button onClick={closeModal} variant="secondary">
                    Cancel Profile Update
                  </Button>
                  <Button onClick={submitUpdateProfile} variant="primary">
                    Update Profile
                  </Button>
                </SpaceBetween>
              }
            >
              <FormField label="Name:" id="name">
                <Input
                  onChange={({ detail }) => setProfileName(detail.name)}
                  value={props?.userProfile?.name}
                />
              </FormField>
              <FormField label="Username:" id="userName">
                <Input
                  onChange={({ detail }) => setProfileUserName(detail.userName)}
                  value={props?.userProfile?.userName}
                />
              </FormField>
              <FormField label="Email:" id="email">
                <Input
                  onChange={({ detail }) => setProfileUserName(detail.email)}
                  value={props?.userProfile?.email}
                />
              </FormField>
            </Form>
          </form>
        </Container>
      ) : (
        <Container>
          <HelpPanel
            // loading={newOrderLoading}
            loadingText="Placing your Order."
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xxs">
                  <Button onClick={closeModal} variant="link">
                    Close
                  </Button>
                </SpaceBetween>
              </Box>
            }
          >
            <div>
              <ul>
                <p>fix me</p>
              </ul>
            </div>
          </HelpPanel>
        </Container>
      )}
    </Modal>
  );
}

export function UpdateProfileModal(props) {
  const { userProfile } = useContext(ProfileContext);
  const [updatePreview, setUpdatePreview] = React.useState(true);

  console.log(props);
  const closeModal = () => {
    setUpdatePreview(true);
    props.close();
  };
  const cancelUpdateProfile = () => {
    window.location.reload(false);
  };

  const submitUpdateProfile = () => {
    setUpdatePreview(false);
    console.log(updatePreview);
  };
  return (
    <PureUpdateProfileModal
      userProfile={userProfile}
      submitUpdateProfile={submitUpdateProfile}
      cancelUpdateProfile={cancelUpdateProfile}
      closeModal={closeModal}
      props={props}
      updatePreview={updatePreview}
      setUpdatePreview={setUpdatePreview}
    />
  );
}

export default UpdateProfileModal;
