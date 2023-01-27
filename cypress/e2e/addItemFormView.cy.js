import {
  aliasQuery,
  aliasMutation,
  hasOperationName,
} from "./utils/graphql-test-utils";

describe("Add Item Form Page", () => {
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
    cy.visit("http://localhost:3000");
    cy.get(".nav-button").eq(2).contains("Profile").click();
    cy.url().should("eq", "http://localhost:3000/profile");
    cy.get("button").eq(3).click();
    cy.url().should("eq", "http://localhost:3000/login");
    cy.get("input").eq(0).click().type("tanna.schmeler@example.net");
    cy.get("input").eq(1).click().type("password");
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
    cy.get("button").contains("Login").click();
    cy.scrollTo("bottom");
    cy.get("button").contains("Add Craft").click();
  });

  it("Should be able to type in any input", () => {
    cy.get("input").eq(0).type("pencil");
    cy.get("input").eq(0).should("have.value", "pencil");
  });

  it("Should have a thank you message and a button", () => {
    cy.get(".instructions").contains(
      "Thank you for contributing to the crafting community! Please fill out the information below to add your craft item:"
    );
    cy.get("button").contains("Add Item");
  });

  it("Should be able to add an item and show the user a confirmation page", () => {
    cy.get("input").eq(0).type("Pencil");
    cy.get("input").eq(0).should("have.value", "Pencil");
    cy.get("input").eq(1).clear().type("7");
    cy.get("input").eq(1).should("have.value", "7");
    cy.get(".dropdown-content").select("Drawing");
    cy.get(".description").type("World's greatest writing material.");
    cy.get(".description").should(
      "have.value",
      "World's greatest writing material."
    );
    cy.get("button").contains("Add Item").click();
    cy.contains("SUCCESS!");
  });
});
