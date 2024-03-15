describe('testing home page before sign in', () => {
  beforeEach(() => {
    // Assuming the recipe page is the root page
    cy.visit('/');
  });

  it('can view the title', () => {
    cy.visit('/');
    cy.contains('Welcome to Fit-ify!');
  });
  
  it('should contain the Fit-ify icon', () => {
    cy.get('svg[data-testid="run-circle"]').should('be.visible');
  });

  it('should contain the "Contact Us" button', () => {
    cy.contains('Contact Us').should('be.visible');
  });

  it('should contain the "Pricing" button', () => {
    cy.contains('Pricing').should('be.visible');
  });

  it('should contain the "Login" button', () => {
    cy.contains('Login').should('be.visible');
  });
});