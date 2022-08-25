import * as React from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../context/profileContext';
import { AuthContext } from '../context/authContext';

import {
  Container,
  Header,
  Cards,
  Button,
  SpaceBetween,
  HelpPanel,
  ColumnLayout,
} from '@cloudscape-design/components';

import { updateProfile, editProfilePhoto } from '../services/profile';

export function PureProfile({
  userProfile,
  profileLoading,
  updateClicked,
  editClicked,
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
              <Button onClick={editClicked}>Edit Profile Photo</Button>
            </SpaceBetween>
          }
        >
          Your Profile
        </Header>
      }
    >
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
                  <ColumnLayout borders="horizontal" columns={3}>
                    <div>
                      <h4>Name:</h4>
                    </div>
                    <div>{userProfile?.name}</div>
                    <br />
                    <div>
                      <h4>UserId:</h4>
                    </div>
                    <div>
                      <p>{userProfile?.username}</p>
                    </div>
                    <br />

                    <div>
                      <h4>Date of Birth:</h4>
                    </div>
                    <div>
                      <p>{userProfile?.dateOfBirth}</p>
                    </div>
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
                  <ColumnLayout borders="horizontal" columns={3}>
                    <h4>Email: </h4> <p>{userProfile?.email}</p>
                    <h4>Address: </h4> <p>{userProfile?.address}</p>
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
  const { sessionInfo } = useContext(AuthContext);

  const updateClicked = () => {
    console.log(sessionInfo.accessToken);
    return updateProfile();
  };

  const editClicked = () => {
    return editProfilePhoto();
  };
  return (
    <PureProfile
      userProfile={userProfile}
      profileLoading={profileLoading}
      editClicked={editClicked}
      updateClicked={updateClicked}
    />
  );
}

export default Profile;
