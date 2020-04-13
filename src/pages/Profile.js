import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProfileCustomNav from './profile_components/ProfileCustomNav'
import ViewProfile from './profile_components/ViewProfile'
import EditProfile from './profile_components/EditProfile'

// Fake User object for testing
const fakeuser = {
  email: 'fakeUser@email.com',
  first_name: 'TEST',
  last_name: 'TEST',
  username: 'fakeuser123'
}

// Fake UserProfile object for testing
const userProfile = {
  username: fakeuser.username,
  phone_number: '(123)456-7890',
  email: fakeuser.email,
  friends: [
    'Sammy', 'George', 'Sarah'
  ],
  first_name: fakeuser.first_name,
  last_name: fakeuser.last_name
}


// for material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    position: "absolute",
    
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));



const Profile = (props) => {

  // const [state, setState] = useState(false)

  const classes = useStyles();

  
  let user
  if (props.token) {
    user = props.user
  } else {
    user = userProfile
  }

  ////////////////////////////
  // Add friends into state //
  // ?????


  // const getUserInfo = async () => {
  //   let token = localStorage.getItem('dinnr-token')
  //   let userID = user.id

  //   let userProfile = await props.UserAPI.getProfile(userID, token)
  //   let userData = await props.UserAPI.getUser(userID, token)
  //   console.log(userData)
  //   console.log(userProfile)

  //   user = {
  //     username: userData.username,
  //     phone_number: userProfile.phone_number,
  //     email: userData.email,
  //     friends: userProfile.friends,
  //     first_name: userData.first_name,
  //     last_name: userData.last_name
  //   }

  //   console.log(user)
  //   return user

  // }

  // useEffect(() => {
  //   getUserInfo()
  //   }, [user]
  // )


  const renderViewProfile = () => {
    return(
      <ViewProfile
      user={props.user} 
      token={props.token}
      />
    )
  }

  const renderEditProfile = () => {
    return(
      <EditProfile
      user={props.user} 
      token={props.token}
      UserAPI={props.UserAPI}
      getLoggedInUser={props.getLoggedInUser}
      />
    )
  }

  const handleEditClick = async (evt) => {
    evt.preventDefault()
    console.log('Go to EDIT PROFILE page')
  }

 return (
  <>
  {
    !props.isLoggedIn 
    ?
    <Redirect to='/login' /> 
    :  
    <div className='profile_main'>
      <div className='user-header'>
        <h3 id='profile-name'>{user.username} <Avatar id='profile-image' className={classes.large} >{`${user.first_name[0]} ${user.last_name[0]}`}</Avatar> </h3>
      </div>
      <Router>
        <ProfileCustomNav user={props.user}/>
        <Route exact path='/profile' render={renderViewProfile} />
        <Route exact path='/profile/edit' render={renderEditProfile} />
      </Router>
    </div>
  }
  </>
);
};

export default Profile;