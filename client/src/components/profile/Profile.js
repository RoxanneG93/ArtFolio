import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import Spinner from '../common/Spinner';
import { getProfileByUsername } from '../../actions/profileActions';
import { getPosts } from '../../actions/postActions';
// import UserPosts from '../posts/UserPosts';

class Profile extends Component {

  componentDidMount() {
   if(this.props.match.params.handle){
      this.props.getProfileByUsername(this.props.match.params.username);
      console.log(this.props);
    }
 
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading} = this.props.profile;
    // const { posts} = this.props.post;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="profile-container container-fluid">
            <div className="back-button">
              <Link to="/dashboard" className="btn btn-light mb-3 float-left">
                Back To Dashboard
              </Link>
            </div>
            <div className="about-container container-fluid">
              <div className="about-row row">
                <div className="profile-details col-md-4">
                 <ProfileDetails profile={profile} />
                </div>
                <div className="user-posts-container col-md-8">
                  <h1>User's Posts would go here</h1>
                  <h1><em>Feature Comming Soon</em></h1>
                </div>
              </div>
            </div>
        </div>
      );
    }

    return (
        <div className="return-profile-container contianer-fluid">
          {profileContent}
        </div>
    );
  }
}

Profile.propTypes = {
  getProfileByUsername: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  // getPosts: PropTypes.func.isRequired,
  // post: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByUsername })(Profile);
