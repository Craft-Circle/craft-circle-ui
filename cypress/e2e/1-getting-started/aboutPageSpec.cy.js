import {aliasQuery, aliasMutation, hasOperationName} from '../utils/graphql-test-utils';

describe('Landing Page', () => {
beforeEach(() => {

  
  cy.intercept('POST', 'https://craft-circle-be.herokuapp.com/graphql', (req) => {
    const { body } = req
    aliasQuery(req, 'getItems')
    if (hasOperationName(req, 'getItems')) {
      req.alias = 'gqlgetItemsQuery'
      req.reply((res) => {
        res.body.data.items = [
          {
            amount: 5,
            available: "false",
            category: "Paper",
            description: "Austin fixie letterpress hashtag brunch normcore chambray.",
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
          }
          
        ]
        
      })
    } else {
      console.log("Not Running")
    }
  })
  cy.visit('http://localhost:3000');
  cy.get(".category-section").should("exist");
  cy.get(".item-card").should("have.length", 3);
  cy.get(".nav-button").eq(1).contains("About").click();
});

    // it('Should display the about info and the nav bar should work', () => {  
// it('Should start on the landing page', () => {

//   cy.get(".category-section").should("exist");
//   cy.get(".item-card").should("have.length", 3);
//   cy.get(".nav-button").eq(1).contains("About").click();
// })


  it("should have a title and a paragraph describing the application", () => {
    // cy.visit('http://localhost:3000/about')
    cy.get(".about-heading").contains("we are Crafters");
    cy.get(".about-paragraph").contains(
      "Craft Circle is an online community where crafters can borrow and donate supplies in an effort to make creative outlets more accessible. Currently, this platform is meant for community members who reside in the Denver Metro area."
    );
  });

  it("should have a section with an animation, a paragraph inviting the user to the community, and a button to join", () => {
    cy.get(".join-cta-container").scrollIntoView();
    cy.get(".cta-animation").should("be.visible")
    cy.get(".cta-paragraph").should(
      "contain",
      "Whether you're looking to share supplies or need to source something for your next creative project, Craft Cirle is the virtal marketplace for you. Click below to join our community of Crafters today and get crafting!"
    );
    cy.get("button").contains("Get Started");
  });

  it("should have a footer that includes an image, the logo and a tagline", () => {
    cy.get(".footer").scrollIntoView();
    cy.get(".footer-image")
      .should("have.attr", "src")
      .should("include", "/static/media/bannerImage4.48bf2aa73069ed02ac35.png");
    cy.get(".footer-logo")
      .should("have.attr", "src")
      .should(
        "include",
        "/static/media/CraftCircleLogo-06.56481d6d54710efa4e63.png"
      );
    cy.get(".footer-tagline").contains(
      "crafting community one stitch at a time"
    );
  });

  it("should allow the user to click the Get Started button and visit their profile page", () => {
    cy.get(".join-cta-container").scrollIntoView();
    cy.get("button").contains("Get Started").click();
    cy.url().should("eq", "http://localhost:3000/profile");
  });

  it("should propmt the user to create a profile or login if they are not logged in", () => {
    cy.get(".join-cta-container").scrollIntoView();
    cy.get("button").contains("Get Started").click();
    cy.url().should("eq", "http://localhost:3000/profile");
    cy.get('.not-loggedin').contains("You're not signed in! Click the button below to sign in or create an account.");
  });

  it("should allow the user to return to the homepage", () => {
    cy.get("button").contains("All Crafts").click();
    cy.get(".landing-page-img")
      .should("have.attr", "alt")
      .should("include", "crafts-in-action");
  });

  it.skip("should allow the user to return to visit their profile from the nav bar", () => {
    cy.get("button").contains("Profile").click();
    cy.get(".about-container").contains("we are Crafters");
  });
  //skipped to be updated when profile component is completed.- still skipped because not sure if we want to test for logging in here... maybe just delete this test?
});
