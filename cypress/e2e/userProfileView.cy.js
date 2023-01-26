import {
  aliasQuery,
  aliasMutation,
  hasOperationName,
} from "../utils/graphql-test-utils";

describe("User Login and Profile Page spec", () => {
  beforeEach(() => {
    cy.intercept(
      "POST",
      "https://craft-circle-be.herokuapp.com/graphql",
      (req) => {
        const { body } = req;
        aliasQuery(req, "getItems");
        if (hasOperationName(req, "getItems")) {
          req.alias = "gqlgetItemsQuery";
          req.reply((res) => {
            res.body.data.items = [
              {
                amount: 5,
                available: "false",
                category: "Paper",
                description:
                  "Austin fixie letterpress hashtag brunch normcore chambray.",
                id: "1",
                name: "Refreshed-copper Awesome Rubber Chair",
                status: "Give",
                user: {
                  email: "collins_alvin@example.com",
                  id: "1",
                  name: "Alvin Collins",
                  __typename: "User",
                },
                __typename: "Item",
              },

              {
                amount: 1,
                available: "true",
                category: "Sewing/Knitting",
                description: "Purple yarn.",
                id: "2",
                name: "Purple Yarn",
                status: "Give",
                user: {
                  email: "collins_alvin@example.com",
                  id: "1",
                  name: "Alvin Collins",
                  __typename: "User",
                },
                __typename: "Item",
              },

              {
                amount: 1,
                available: "true",
                category: "Paper",
                description: "New package of color construction paper.",
                id: "3",
                name: "Construction Paper",
                status: "Give",
                user: {
                  email: "joe@example.com",
                  id: "2",
                  name: "Crafty Joe",
                  __typename: "User",
                },
                __typename: "Item",
              },
            ];
          });
        } else {
          console.log("Not Running");
        }
      }
    );
    cy.intercept(
      "POST",
      "https://craft-circle-be.herokuapp.com/graphql",
      (req) => {
        const { body } = req;
        aliasQuery(req, "getAUser");
        if (hasOperationName(req, "getAUser")) {
          req.alias = "gqlgetAUserQuery";
          req.reply((res) => {
            res.body.data.details = {
              email: "tanna.schmeler@example.net",
              id: "9",
              items: [
                {
                  amount: 5,
                  available: "false",
                  category: "Paper",
                  description:
                    "Austin fixie letterpress hashtag brunch normcore chambray.",
                  id: "1",
                  name: "Refreshed-copper Awesome Rubber Chair",
                  status: "Give",
                  __typename: "Item",
                },
                {
                  amount: 1,
                  available: "true",
                  category: "Sewing/Knitting",
                  description: "Purple yarn.",
                  id: "2",
                  name: "Purple Yarn",
                  status: "Give",
                  __typename: "Item",
                },
              ],
              name: "Tanna Test",
              __typename: "User",
            };
          });
        } else {
          console.log("Not Running");
        }
      }
    );
    cy.visit("http://localhost:3000/");
    cy.get(".nav-bar").should("exist");
    cy.get(".nav-button").eq(2).click();
    cy.get("button").eq(3).click();
  });

  it("Should be able to go to the profile page, navigate to the login, and sign in as a user", () => {
    cy.get("input").eq(0).type("tanna.schmeler@example.net");
    cy.get("input").eq(1).type("password");
    cy.get("button").eq(3).click();
    cy.url().should("include", "/profile");
  });

  it("Should be able to go to the profile page, navigate to the login, and display an error if the login info is incorrect", () => {
    cy.get("input").eq(0).type("tanna.schmeler@example.net");
    cy.get("input").eq(1).type("passwwwwwwword");
    cy.get("button").eq(3).click();
    cy.url().should("include", "/login");
    cy.contains("Invalid email or password. Please try again.");
  });

  it("Should have the users's info", () => {
    cy.get("input").eq(0).type("tanna.schmeler@example.net");
    cy.get("input").eq(1).type("password");
    cy.get("button").eq(3).click();
    cy.get(".user-banner-img")
      .should("have.attr", "src")
      .should(
        "include",
        "/static/media/userBannerImg.00a559cd8e1ddf13f285.jpg"
      );
    cy.get(".profile-picture")
      .should("have.attr", "src")
      .should(
        "include",
        "/static/media/CCProfilePic-01.05c2ff063290d5757c55.png"
      );
    cy.get(".profile-user-name").should("have.text", "Tanna Test");
    cy.get(".profile-user-email").should(
      "have.text",
      "tanna.schmeler@example.net"
    );
  });

  it("Should include a section with the user's inventory full of craft items", () => {
    cy.get("input").eq(0).type("tanna.schmeler@example.net");
    cy.get("input").eq(1).type("password");
    cy.get("button").eq(3).click();
    cy.contains("Crafts I'm Offering");
    cy.get(".item-container").children().should("have.length", 2);
    cy.get(".item-container").children().eq(1).should("contain", "Purple Yarn");
  });

  it("Should be able to navigate to the add a craft item page", () => {
    cy.get("input").eq(0).type("tanna.schmeler@example.net");
    cy.get("input").eq(1).type("password");
    cy.get("button").eq(3).click().wait(2000);

    cy.get("button").contains("Add Craft").click();
    cy.url().should("eq", "http://localhost:3000/contribution");
  });

  it("Should be able to delete a craft item", () => {
    cy.get("input").eq(0).type("tanna.schmeler@example.net");
    cy.get("input").eq(1).type("password");
    cy.get("button").eq(3).click().wait(2000);
    cy.get(".delete-btn").eq(0).click();
  });

  it("Should be able to change the profile's color", () => {
    cy.get("input").eq(0).type("tanna.schmeler@example.net");
    cy.get("input").eq(1).type("password");
    cy.get("button").eq(3).click();
    cy.get(".color-changer").contains("Pick Profile Color:");
    cy.get(".color-box")
      .last()
      .should(
        "have.css",
        "background",
        "rgb(161, 142, 150) none repeat scroll 0% 0% / auto padding-box border-box"
      );
    cy.get(".color-box").first().click();
    cy.get(".profile-user-name").should(
      "have.css",
      "color",
      "rgb(173, 146, 192)"
    );
  });

  it("Should be able to log out", () => {
    cy.get("input").eq(0).type("tanna.schmeler@example.net");
    cy.get("input").eq(1).type("password");
    cy.get("button").eq(3).click().wait(2000);

    cy.get("button").last().click();
    cy.url().should("eq", "http://localhost:3000/login");
  });
});
