import {
  aliasQuery,
  aliasMutation,
  hasOperationName,
} from "./utils/graphql-test-utils";

describe("Craft Circle landing page view", () => {
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
    cy.get(".item-card").eq(1).click();
  });

  it("should have an image and a button", () => {
    cy.get(".item-image-large")
      .should("have.attr", "src")
      .should(
        "include",
        "/static/media/myrlene-numa-SnITZTTeJVE-unsplash.d15e0e0e931c00c2e117.jpg"
      );
    cy.get("button").contains("Contact Crafter");
  });

  it("should include five pieces of information: category, name, amount, crafter name and description", () => {
    cy.get(".category").contains("Sewing/Knitting");
    cy.get(".craft-name").contains("Purple Yarn");
    cy.get(".amount").contains("Amount: 1");
    cy.get(".crafter-name").contains("Alvin Collins");
    cy.get(".description").contains("Purple yarn.");
  });

  it("should allow the user to visit the about page", () => {
    cy.get("button").contains("About").click();
    cy.get(".about-container").contains("We are Crafters");
  });

  it("should allow the user to return to the homepage", () => {
    cy.get("button").contains("All Crafts").click();
    cy.get(".landing-page-img")
      .should("have.attr", "alt")
      .should("include", "crafts-in-action");
  });

  it("should allow the user to view their profile", () => {
    cy.get("button").contains("Profile").click();
    cy.get(".user-profile").contains(
      "You're not signed in! Click the button below to sign in or create an account."
    );
  });
});
