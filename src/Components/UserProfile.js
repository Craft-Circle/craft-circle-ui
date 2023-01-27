import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../constants/colors";
import Button from "./Button";
import ColorChanger from "./ColorChanger";
import InventoryContainer from "./InventoryContainer";

const UserProfile = ({ user, userItems, setUser, removeItem }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentColor, setCurrentColor] = useState("craftBlue");

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
  };

  if (!currentUser) {
    return (
      <UserProfileSection className="user-profile">
        <SignInImage
          className="not-signed-in-img"
          src={require(`../assets/userProfileImgs/CCpaintbrushbro-01.png`)}
          alt="not signed in image"
        />
        <SectionHeader style={{ color: colors.craftGreen }}>
          You're not signed in! Click the button below to sign in or create an
          account.
        </SectionHeader>
        <Button name={"Login"} link={"/login"} />
      </UserProfileSection>
    );
  }

  return (
    <UserProfileSection className="user-profile">
      <BannerImg
        className="user-banner-img"
        src={require(`../assets/userProfileImgs/userBannerImg.jpg`)}
        alt=""
      />
      <ProfilePicture
        className="profile-picture"
        src={require(`../assets/userProfileImgs/CCProfilePic-01.png`)}
        alt="your profile picture"
        style={{ boxShadow: `-12px -12px 0px ${colors[currentColor]}` }}
      />
      <ProfileName
        className="profile-user-name"
        style={{ color: colors[currentColor] }}
      >
        {currentUser.name}
      </ProfileName>
      <ProfileEmail
        className="profile-user-email"
        style={{ color: colors[currentColor] }}
      >
        {currentUser.email}
      </ProfileEmail>
      <SectionHeader style={{ color: colors[currentColor] }}>
        Crafts I'm Offering
      </SectionHeader>
      <InventoryContainer
        removeItem={removeItem}
        color={currentColor}
        data={userItems}
      />
      <Button name={"Add Craft"} link={"/contribution"} />
      <ColorChanger color={currentColor} updateColor={setCurrentColor} />
      <Button name={"Log Out"} action={handleLogout} link={"/login"} />
    </UserProfileSection>
  );
};

export default UserProfile;

const UserProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10vh;
`;

const BannerImg = styled.img`
  width: 85vw;
  border-radius: 25px;
`;

const ProfilePicture = styled.img`
  width: 230px;
  height: 230px;
  border-radius: 25px;
  position: relative;
  top: -90px;
  z-index: 1;
`;

const ProfileName = styled.h1`
  font-size: 35px;
  font-weight: 900;
  margin: 0;
`;

const ProfileEmail = styled.h2`
  font-size: 25px;
  font-weight: 900;
`;

const SectionHeader = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: 900;
`;

const SignInImage = styled.img`
  width: 230px;
  height: 230px;
`;
