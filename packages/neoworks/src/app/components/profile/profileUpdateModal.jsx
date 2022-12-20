import * as React from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profileContext';
import { useNavigate } from 'react-router-dom';

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
  setUpdatePreview,
  updatePreview,
  cancelUpdateProfile,
  closeModal,
  props,
  profileName,
  setProfileName,
  setEmail,
  email,
  userName,
  setUserName,
  updatingProfile,
  updateProfileResponse,
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
                  onChange={({ detail }) => {
                    setProfileName(detail.value);
                    console.log(detail.value);
                    console.log(profileName);
                  }}
                  value={profileName}
                />
              </FormField>
              <FormField label="Username:" id="userName">
                <Input
                  onChange={({ detail }) => setUserName(detail.value)}
                  value={userName}
                />
              </FormField>
              <FormField label="Email:" id="email">
                <Input
                  onChange={({ detail }) => setEmail(detail.value)}
                  value={email}
                />
              </FormField>
            </Form>
          </form>
        </Container>
      ) : (
        <Container>
          <HelpPanel
            loading={updatingProfile}
            loadingText="Updating Your Profile..."
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
                <p>{updateProfileResponse}</p>
              </ul>
            </div>
          </HelpPanel>
        </Container>
      )}
    </Modal>
  );
}

export function UpdateProfileModal(props) {
  const { userProfile, updateUserProfile, updatingProfile } =
    useContext(ProfileContext);
  const [updatePreview, setUpdatePreview] = React.useState(true);
  const [profileName, setProfileName] = React.useState(
    props?.userProfile?.name
  );
  const [userName, setUserName] = React.useState(props?.userProfile?.userName);
  const [email, setEmail] = React.useState(props?.userProfile?.email);
  const [updateProfileResponse, setUpdateProfileResponse] = React.useState();

  const navigate = useNavigate();

  const closeModal = (e) => {
    e.preventDefault();
    setUpdatePreview(true);
    setProfileName(props?.userProfile?.name);
    props.close();
  };
  const cancelUpdateProfile = (e) => {
    e.preventDefault();
    props.close();
  };

  const submitUpdateProfile = async () => {
    setUpdatePreview(false);
    const body = {
      userId: props?.userProfile?.Id,
      email,
      name: profileName,
      legalName: props?.userProfile?.legalName,
      userName,
      address: props?.userProfile?.address,
      dateOfBirth: props?.userProfile?.dateOfBirth,
    };
    try {
      const submitProfile = await updateUserProfile(body);
      if (submitProfile.code) {
        setUpdateProfileResponse(
          'Sorry, could not update your Profile.  Please try again later.'
        );
      }
      setUpdateProfileResponse('Your profile was successfully updated.');
    } catch (e) {
      console.log(e);
    }
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
      userName={userName}
      setUserName={setUserName}
      profileName={profileName}
      setProfileName={setProfileName}
      email={email}
      setEmail={setEmail}
      updatingProfile={updatingProfile}
      updateProfileResponse={updateProfileResponse}
    />
  );
}

export default UpdateProfileModal;
