import {
  aliasQuery,
  aliasMutation,
  hasOperationName,
} from "./utils/graphql-test-utils";

describe("Landing Page", () => {
  it("Should display a landing page with a nav bar, carousel, category icons, and item cards, and be able to search, filter by category, and use nab bar", () => {
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
    cy.visit("http://localhost:3000/");
    cy.wait("@gqlgetItemsQuery");
    cy.get(".nav-bar").should("exist");

    cy.get(".nav-button").eq(0).contains("All Crafts");
    cy.get(".nav-button").eq(1).contains("About");
    cy.get(".nav-button").eq(2).contains("Profile");

    cy.get(".logo")
      .should("have.attr", "src")
      .should("include", "CraftCircleLogo");

    cy.get(".landing-page-img")
      .should("have.attr", "src")
      .should("include", "bannerImage");

    cy.get(".category-section").should("exist");
    cy.get("h1").should("contain", "Categories:");
    cy.get(".category-section").children().should("have.length", 10);

    cy.get(".category-section")
      .children()
      .eq(0)
      .should("contain", "sewing/knitting");
    cy.get(".category-section").children().eq(1).should("contain", "paper");
    cy.get(".category-section").children().eq(2).should("contain", "baking");
    cy.get(".category-section").children().eq(3).should("contain", "jewelry");
    cy.get(".category-section")
      .children()
      .eq(4)
      .should("contain", "scrapbook/floral");
    cy.get(".category-section").children().eq(5).should("contain", "painting");
    cy.get(".category-section").children().eq(6).should("contain", "drawing");
    cy.get(".category-section")
      .children()
      .eq(7)
      .should("contain", "wood working");
    cy.get(".category-section").children().eq(8).should("contain", "pottery");
    cy.get(".category-section").children().eq(9).should("contain", "other");

    cy.get("h1").should("contain", "Crafts:");
    cy.get("h1").should("contain", "Search:");
    cy.get("input").should("exist");

    cy.get(".item-card").should("have.length", 3);
    cy.get(".item-card")
      .eq(0)
      .should("contain", "Refreshed-copper Awesome Rubber Chair");
    cy.get(".item-card").eq(0).should("contain", "Amount: 5");
    cy.get(".item-card").eq(0).should("contain", "Alvin Collins");

    cy.get(".category-section").children().eq(1).click();
    cy.get(".item-card").should("have.length", 2);
    cy.get(".item-card")
      .eq(0)
      .should("contain", "Refreshed-copper Awesome Rubber Chair");

    cy.get(".category-section").children().eq(0).click();
    cy.get(".item-card").should("have.length", 1);
    cy.get(".item-card").eq(0).should("contain", "Purple Yarn");

    cy.get(".category-section").children().eq(0).click();
    cy.get(".item-card").should("have.length", 3);

    cy.get("input").type("example");
    cy.get(".item-card").should("have.length", 0);
    cy.get("h2").should("contain", "Nothing Found!");

    cy.get("input").clear();
    cy.get("input").type("purple");
    cy.get(".item-card").should("have.length", 1);
    cy.get(".item-card").eq(0).should("contain", "Purple Yarn");
    cy.get(".category-section").children().eq(0).click();
    cy.get(".item-card").should("have.length", 1);
    cy.get(".item-card").eq(0).should("contain", "Purple Yarn");

    cy.get(".item-card").eq(0).click();
    cy.url().should("contain", "http://localhost:3000/craft/2");

    cy.get(".nav-button").eq(1).click();
    cy.url().should("contain", "http://localhost:3000/about");

    cy.get(".nav-button").eq(0).click();
    cy.url().should("contain", "http://localhost:3000");

    cy.get(".nav-button").eq(2).click();
    cy.url().should("contain", "http://localhost:3000/profile");
  });
});
