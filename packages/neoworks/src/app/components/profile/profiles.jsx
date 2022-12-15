import * as React from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../context/profileContext';

import {
  Container,
  Header,
  Cards,
  Button,
  SpaceBetween,
  HelpPanel,
  ColumnLayout,
} from '@cloudscape-design/components';

import { editProfilePhoto } from '../../services/profile';
import { UpdateProfileModal } from './profileUpdateModal';

export function PureProfile({
  userProfile,
  profileLoading,
  updateClicked,
  editClicked,
  close,
  showUpdateProfileModal,
  setshowUpdateProfileModal,
}) {
  return (
    <Container
      header={
        <Header
          variant="h2"
          description=""
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button onClick={updateClicked}>Update</Button>
            </SpaceBetween>
          }
        >
          Your Profile
        </Header>
      }
    >
      {!profileLoading && (
        <UpdateProfileModal
          open={showUpdateProfileModal}
          close={close}
          userProfile={userProfile}
        />
      )}

      <Cards
        loading={profileLoading}
        loadingText="Loading Your Profile"
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          sections: [
            {
              id: 'personalInfo',
              name: 'Personal Info',
              content: (item) => (
                <HelpPanel header={<h3>Personal Info</h3>}>
                  <ColumnLayout
                    variant="text-grid"
                    borders="horizontal"
                    columns={2}
                  >
                    <h4>Name:</h4>
                    {userProfile?.name}

                    <h4>User Name:</h4>

                    {userProfile?.userName}

                    <h4>Date of Birth:</h4>
                    {userProfile?.dateOfBirth}
                  </ColumnLayout>
                </HelpPanel>
              ),
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 300, cards: 1 }]}
        items={[
          {
            size: 'Small',
            id: 'personalInfo',
            name: 'personalInfo',
          },
        ]}
        empty={<p>No profile info</p>}
      />
      <Cards
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          sections: [
            {
              id: 'contactInfo',
              name: 'Contact Info',
              content: (item) => (
                <HelpPanel header={<h2>Contact Info</h2>}>
                  <ColumnLayout
                    variant="text-grid"
                    borders="horizontal"
                    columns={2}
                  >
                    <h4>Email: </h4> {userProfile?.email}
                    <h4>Address: </h4> {userProfile?.address}
                  </ColumnLayout>
                </HelpPanel>
              ),
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 300, cards: 1 }]}
        items={[
          {
            size: 'Small',
            id: 'contactInfo',
            name: 'contactInfo',
          },
        ]}
        empty={<p>No profile info</p>}
      />
    </Container>
  );
}
export function Profile() {
  const { userProfile, loading: profileLoading } = useContext(ProfileContext);

  const [showUpdateProfileModal, setshowUpdateProfileModal] =
    React.useState(false);

  const closeUpdateProfileModal = () => {
    setshowUpdateProfileModal(false);
  };

  const updateClicked = (e) => {
    e.preventDefault();
    setshowUpdateProfileModal(true);
  };

  return (
    <PureProfile
      userProfile={userProfile}
      profileLoading={profileLoading}
      updateClicked={updateClicked}
      close={closeUpdateProfileModal}
      showUpdateProfileModal={showUpdateProfileModal}
      setshowUpdateProfileModal={setshowUpdateProfileModal}
    />
  );
}

export default Profile;
