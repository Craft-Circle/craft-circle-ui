import React from "react";
import styled from "styled-components";
import colors from "../constants/colors";
import { gql, useMutation } from "@apollo/client";

const EDIT_ITEM = gql`
  mutation editItem(
    $id: ID!,
    $available: Int!) {
    editItem(
      input: {
        id: $id,
        available: $available
      })
    {
      item{
        id
        available
        user {
          id
          name
          email
        }
      }
    }
  }
`

const ToggleSwitch = ({ textOne, textTwo, color, setActiveStatus, currentlyActive, id, unlistItem, relistItem }) => {
  const [editItem, {loading, error, data }] = useMutation(EDIT_ITEM)

  const makeOneActive = () => {
    editItem({
      variables: {
        id: id, 
        available: 1,
      },
    }).then((response) => {
    if (response.data.editItem.item.available === "true") {
      setActiveStatus(textOne);
    }
    })
    relistItem(id)
  };

  const makeTwoActive = () => {
    editItem({
      variables: {
        id: id, 
        available: 0,
      },
    }).then((response) => {
      if (response.data.editItem.item.available === "false") {
        setActiveStatus(textTwo);
      }
    })
    unlistItem(id)
  // do a mutation to update available to false 
  };

  return (
    <ToggleBackground>
      <Option
        onClick={() => makeOneActive()}
        style={{
          background: `${
            currentlyActive === textOne ? colors[color] : "transparent"
          }`,
        }}
      >
        <Text
          style={{
            color: `${
              currentlyActive === textOne ? colors.craftWhite : colors[color]
            }`,
          }}
        >
          {textOne}
        </Text>
      </Option>
      <Option
        onClick={() => makeTwoActive()}
        style={{
          background: `${
            currentlyActive === textTwo ? colors[color] : "transparent"
          }`,
        }}
      >
        <Text
          style={{
            color: `${
              currentlyActive === textTwo ? colors.craftWhite : colors[color]
            }`,
          }}
        >
          {textTwo}
        </Text>
      </Option>
    </ToggleBackground>
  );
};

export default ToggleSwitch;

const ToggleBackground = styled.div`
  height: 50px;
  width: 140px;
  border-radius: 10px;
  display: flex;
  background: ${colors.craftWhite};
  margin-bottom: 15px;
`;

const Option = styled.div`
  height: 50px;
  width: 70px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: 700;
`;
