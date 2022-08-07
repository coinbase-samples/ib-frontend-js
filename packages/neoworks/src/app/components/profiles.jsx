import * as React from 'react';
import {
  Container,
  Header,
  Button,
  SpaceBetween,
  HelpPanel,
  Icon,
} from '@cloudscape-design/components';

export function Profile() {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Container
      header={
        <Header
          variant="h2"
          description=""
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button>Update</Button>
              <Button>Edit Profile Photo</Button>
            </SpaceBetween>
          }
        >
          Your Profile
        </Header>
      }
    >
      <HelpPanel header={<h2>Contact Info</h2>}>
        <div>
          <h4>Name: </h4> <p>Jay Parisi</p>
          <h4>Email: </h4> <p>jay@neoworks.com</p>
        </div>
      </HelpPanel>
      <HelpPanel header={<h2>Personal Info</h2>}>
        <div>
          <h4>Legal Name: </h4> <p>Jay Parisi</p>
          <h4>Date of Birth: </h4> <p>03/25/1982</p>
          <h4>Address: </h4> <p>742 Evergreen Terrace in Springfield</p>
        </div>
      </HelpPanel>
    </Container>
  );
}

export default Profile;
