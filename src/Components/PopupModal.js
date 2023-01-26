import React from "react";
import styled from "styled-components";
import colors from "../constants/colors";
import Button from "./Button";
import { gql, useMutation } from "@apollo/client";

const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(input: { id: $id }) {
      success
    }
  }
`;

const PopupModal = ({ id, close, removeItem }) => {
  const [deleteItem] = useMutation(DELETE_ITEM);

  const handleClick = (e) => {
    deleteItem({
      variables: {
        id: id,
      },
    }).then((response) => {
      if (response.data.deleteItem.success) {
        removeItem(id);
      } else {
        console.log("DELETE FAILED");
      }
    });
  };

  return (
    <ModalBackground>
      <Message>
        Are you sure you want to delete this craft item from your inventory?
      </Message>
      <BtnContainer>
        <Button
          className="yes-delete-btn"
          name={"Yes, delete"}
          link={""}
          action={(e) => handleClick(e)}
        />
        <Button
          className="dont-delete-btn"
          name={"No, keep this craft"}
          link={""}
          action={() => close()}
        />
      </BtnContainer>
    </ModalBackground>
  );
};

export default PopupModal;

const ModalBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 500px;
  border: 10px solid ${colors.craftBlack};
  border-radius: 25px;
  background: ${colors.craftWhite};
`;

const Message = styled.h2`
  text-align: center;
  width: 80%;
  color: ${colors.craftOrange};
  font-size: 22px;
  font-weight: 900;
  margin: 0;
  margin-bottom: 10%;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
