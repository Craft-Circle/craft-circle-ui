import React, { useState } from "react";
import styled from "styled-components";
import colors from "../constants/colors";
import Popup from "reactjs-popup";
import ToggleSwitch from "./ToggleSwitch";
import PopupModal from "./PopupModal";

const InventoryCard = ({ name, amount, color, id, removeItem, unlistItem, relistItem}) => {
  const [currentlyActive, setActiveStatus] = useState("list");
 

  return (
    <ItemCardSection className={`${color} item-card`}>
      <ItemCardImg
        className="stock-img"
        src={require("../assets/myrlene-numa-SnITZTTeJVE-unsplash.jpg")}
        alt="craft-item"
      />
      <ItemBoxDiv>
        <ItemH4>{name}</ItemH4>
        <ItemP>Amount: {amount}</ItemP>
        <ToggleSwitch
          textOne={"list"}
          textTwo={"unlist"}
          color={color}
          setActiveStatus={setActiveStatus}
          currentlyActive={currentlyActive}
          id={id}
          unlistItem={unlistItem}
          relistItem={relistItem}
        />
        <StyledPopup
          trigger={
            <DeleteButton
              className="delete-btn"
              style={{ background: colors[color] }}
            >
              delete
            </DeleteButton>
          }
          modal
          nested
          closeOnDocumentClick
        >
          {(close) => (
            <PopupModal removeItem={removeItem} id={id} close={close} />
          )}
        </StyledPopup>
      </ItemBoxDiv>
    </ItemCardSection>
  );
};

export default InventoryCard;

const ItemCardImg = styled.img`
  width: 200px;
  max-height: 200px;
  border-radius: 25px;
`;

const ItemH4 = styled.h4`
  font-size: 15pt;
  margin: 0;
`;
const ItemP = styled.p`
  font-size: 16pt;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ItemBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;
`;

const ItemCardSection = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 25px;
  width: 470px;
  height: 220px;
  margin: 20px;
  background: white;
  padding: 30px;
  &.craftGreen {
    color: ${colors.craftGreen};
    box-shadow: 20px 20px 0px ${colors.craftGreen};
  }
  &.craftPink {
    color: ${colors.craftPink};
    box-shadow: 20px 20px 0px ${colors.craftPink};
  }
  &.craftBlue {
    color: ${colors.craftBlue};
    box-shadow: 20px 20px 0px ${colors.craftBlue};
  }
  &.craftPurple {
    color: ${colors.craftPurple};
    box-shadow: 20px 20px 0px ${colors.craftPurple};
  }
  &.craftOrange {
    color: ${colors.craftOrange};
    box-shadow: 20px 20px 0px ${colors.craftOrange};
  }
  &.craftGrey {
    color: ${colors.craftGrey};
    box-shadow: 20px 20px 0px ${colors.craftGrey};
  }
`;

const DeleteButton = styled.button`
  color: ${colors.craftWhite};
  border-radius: 10px;
  border: 0;
  margin-top: 5px;
  font-size: 12px;
  font-weight: 700;
  padding-left: 10px;
  padding-right: 10px;
  height: 25px;
  &:hover {
    cursor: pointer;
    color: ${colors.craftBlack};
  }
`;

const StyledPopup = styled(Popup)``;
