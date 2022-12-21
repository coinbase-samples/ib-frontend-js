import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Input, Button, Container, TopNavigation, SpaceBetween } from "@cloudscape-design/components";

import { AuthContext } from '../context/authContext';


export function Landing() {
  const navigate = useNavigate()
  const { signInWithEmail } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailure, setLoginFailure] = useState(false);

  let failureResponse;
  
  const handleSignIn = async () => {
    try {
      await signInWithEmail(username, password);
      navigate('/home')
    } catch (e) {
      setLoginFailure(true)
       failureResponse = e
         
    }
  };

  return (
    <SpaceBetween direction="vertical" size="xxl">
    
    <TopNavigation
    identity={{
      href: "#",
      title: "NeoWorks",
      logo: {
        src:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDNweCIgaGVpZ2h0PSIzMXB4IiB2aWV3Qm94PSIwIDAgNDMgMzEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGZpbGw9IiMyMzJmM2UiIHN0cm9rZT0iI2Q1ZGJkYiIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MiIgaGVpZ2h0PSIzMCIgcng9IjIiPjwvcmVjdD4KICAgICAgICA8dGV4dCBmb250LWZhbWlseT0iQW1hem9uRW1iZXItUmVndWxhciwgQW1hem9uIEVtYmVyIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHRzcGFuIHg9IjkiIHk9IjE5Ij5Mb2dvPC90c3Bhbj4KICAgICAgICA8L3RleHQ+CiAgICA8L2c+Cjwvc3ZnPgo=",
        alt: "Service"
      }
    }}
    
    i18nStrings={{
      searchIconAriaLabel: "Search",
      searchDismissIconAriaLabel: "Close search",
      overflowMenuTriggerText: "More",
      overflowMenuTitleText: "All",
      overflowMenuBackIconAriaLabel: "Back",
      overflowMenuDismissIconAriaLabel: "Close menu"
    }}
  />
  <Grid
      gridDefinition={[
        { colspan: { default: 6, s: 3 }, offset: { s: 0, m: 3 }  },
      ]}
    ><Container>
    <div>
      Username:
      <Input
        value={username}
        onChange={({detail}) => setUsername(detail.value)}
      />
      <br />
      Password:{' '}
      <Input
        type="password"
        value={password}
        onChange={({detail}) => setPassword(detail.value)}
      />
      <br />
      {loginFailure ? ( <p style={{color: "red"}}>Login Error: {failureResponse} please try again.</p> ) : ('' )}
      <Button onClick={handleSignIn}>Sign in</Button>
    </div>

    </Container>
    </Grid>
      
      </SpaceBetween>
  );
}

