describe("Loading Page Spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should contain an animation of a person drawing and a message communicating that the page is loading", () => {
    cy.get(".loading-animation").should("be.visible");
    cy.get(".loading-message").contains(
      "Please wait, our application is loading ...."
    );
  });

  it("should disappear after the page has successfully loaded", () => {
    cy.get(".loading-page").should("be.visible");
    cy.get(".loading-page").should("not.exist");
    cy.get(".nav-bar").should("be.visible");
  });
});
