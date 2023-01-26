import React, { useState } from "react";
import styled from "styled-components";
import colors from "../constants/colors";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const CREATE_ITEM = gql`
  mutation createItem(
    $name: String!
    $category: Int!
    $description: String!
    $available: Int!
    $amount: Int!
    $status: Int!
    $userId: ID!
  ) {
    createItem(
      input: {
        name: $name
        category: $category
        description: $description
        available: $available
        amount: $amount
        status: $status
        userId: $userId
      }
    ) {
      item {
        id
        name
        description
        category
        available
        status
        user {
          id
          name
          email
        }
      }
    }
  }
`;

const Form = ({ addItem, user }) => {
  const [itemName, setItemName] = useState("");
  const [amount, setItemAmount] = useState(0);
  const [description, setItemDescription] = useState("");
  const [category, setItemCategory] = useState("");
  const [missingInfo, setMissingInfo] = useState(false);
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM);
  const navigate = useNavigate();

  const handleCreateItem = (e) => {
    if (itemName && amount && description && category !== 99) {
      e.preventDefault();
      createItem({
        variables: {
          name: itemName,
          category: category,
          description: description,
          available: 1,
          amount: amount,
          status: 0,
          userId: user.id,
        },
      }).then((response) => {
        addItem(response.data.createItem.item);
        navigate("/confirmation");
      });
    } else {
      setMissingInfo(true);
    }
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <Section>
      <CraftFormSection>
        <AddImage>Upload your image here</AddImage>
        <CraftForm className="add-item">
          <Instructions className="instructions">
            Thank you for contributing to the crafting community! Please fill
            out the information below to add your craft item:
          </Instructions>
          {missingInfo && (
            <FormError>
              Looks like you're still missing something. Please complete all the
              fields.
            </FormError>
          )}
          <FormInputContainer>
            <Label>Name</Label>
            <Input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            ></Input>
          </FormInputContainer>
          <CategoryAmountContainer>
            <FormInputContainer>
              <Label>Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setItemAmount(parseInt(e.target.value))}
              ></Input>
            </FormInputContainer>
            <FormInputContainerCategory>
              <Label>Category</Label>
              <Select
                className="dropdown-content"
                onChange={(e) => setItemCategory(parseInt(e.target.value))}
              >
                <option value="99">Please Select</option>
                <option value="0">Sewing/Knitting</option>
                <option value="1">Paper</option>
                <option value="2">Jewelry</option>
                <option value="3">Baking</option>
                <option value="4">Scrapbook/Floral</option>
                <option value="5">Painting</option>
                <option value="6">Drawing</option>
                <option value="7">Wood Working</option>
                <option value="8">Pottery</option>
                <option value="9">Other</option>
              </Select>
            </FormInputContainerCategory>
          </CategoryAmountContainer>
          <FormInputContainer>
            <Label>Description</Label>
            <InputDescription
              className="description"
              rows="5"
              cols="70"
              type="text"
              value={description}
              onChange={(e) => setItemDescription(e.target.value)}
            ></InputDescription>
          </FormInputContainer>
        </CraftForm>
      </CraftFormSection>
      <Button name={"Add Item"} link={""} action={handleCreateItem} />
    </Section>
  );
};

export default Form;

const Label = styled.h3`
  color: ${colors.craftGreen};
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CraftFormSection = styled.section`
  width: 85vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const FormInputContainer = styled.div``;

const CraftForm = styled.form`
  padding-left: 15%;
  margin: 0;
`;

const Input = styled.input`
  border: 0;
  border-radius: 25px;
  width: 200px;
`;

const AddImage = styled.div`
  height: 300px;
  width: 300px;
  border-radius: 25px;
  background: ${colors.craftGreen};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputDescription = styled.textarea`
  text-indent: 10px;
  border: 0;
  border-radius: 15px;
`;

const CategoryAmountContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 70%;
`;

const Select = styled.select`
  border: 0px;
  border-radius: 15px;
  width: 150px;
`;

const Instructions = styled.p`
  color: ${colors.craftBlack};
  font-weight: 700;
  width: 70%;
`;

const FormInputContainerCategory = styled.div`
  margin-left: 15%;
`;

const FormError = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.craftOrange};
`;
