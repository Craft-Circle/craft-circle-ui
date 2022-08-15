import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./NavBar";
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./AboutPage";
import UserProfile from "./UserProfile";
import Form from "./Form";
import ItemExpanded from "./ItemExpanded";
import Login from "./Login";
import NoMatch from "./NoMatch";
import LoadingPage from "./LoadingPage";
import Confirmation from "./Confirmation";
import ErrorPage from "./ErrorPage";

const GET_ITEMS = gql`
  query getItems {
    items: getItems {
      id
      name
      description
      available
      category
      status
      amount
      user {
        id
        name
        email
      }
    }
  }
`;

function App() {
  const findItem = (id) => {
    if (allCraftItems.data && allCraftItems.data.items) {
      return allItems.find((item) => item.id === id);
    }
  };

  const allCraftItems = useQuery(GET_ITEMS);

  const loading = allCraftItems.loading;
  const error = allCraftItems.error;

  const [allItems, setAllItems] = useState([]);
  const [user, setUser] = useState(null);
  const [userItems, setUserItems] = useState([]);
  
  useEffect(() => {
    if (allCraftItems.data && allCraftItems.data.items) {
      const availableItems = allCraftItems.data.items.filter((item) => {
        return item.available === "true"
      })
      setAllItems(availableItems);
    }
  }, [allCraftItems.data]);
// when the application refreshes, the list/unlist works, but does not refresh immediately after user has updated an item 
// the mutations are working 
// in app, we have a remove item func that uses filter to remove the item when the delete mutation happens 
// we could do something similar to handle and edit, and filter through, find the same ID and then change the availability accordingly 
// that would be invoked in the handleOne/ two funcs that are in toggle switch 

  const loginUser = (userData) => {
    setUser(userData);
    setUserItems(userData.items);
  };

  const addItem = (item) => {
    setAllItems([...allItems, item]);
    setUserItems([...userItems, item]);
  };

  const removeItem = (id) => {
    setAllItems(allItems.filter((item) => item.id !== id));
    setUserItems(userItems.filter((item) => item.id !== id));
  };

  const unlistItem = (id) => {
    setAllItems(allItems.filter((item) => item.id !== id));
    // probably need to somehow update the user's items here too so the change is the same 
  }

  const relistItem = (id) => {
    const relistedItem = userItems.filter((item) => {
      return item.id === id
    })
    setAllItems([...allItems, relistedItem])
    // same thing here- we need to update the user's item to keep the change on the toggle switch 
  }

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  return (
    <main>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LandingPage
              itemData={allItems.length ? allItems : allCraftItems.data.items}
            />
          }
        />
        <Route exact path="about" element={<AboutPage />} />
        <Route
          exact
          path="profile"
          element={
            <UserProfile
              removeItem={removeItem}
              user={user}
              userItems={userItems}
              setUser={setUser}
              unlistItem={unlistItem}
              relistItem={relistItem}
            />
          }
        />
        <Route
          exact
          path="contribution"
          element={<Form addItem={addItem} user={user} />}
        />
        <Route
          exact
          path="craft/:craftId"
          element={<ItemExpanded findItem={findItem} />}
        />
        <Route exact path="confirmation" element={<Confirmation />} />
        <Route exact path="login" element={<Login loginUser={loginUser} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </main>
  );
}

export default App;

const Img = styled.img`
  width: 100vw;
`;
