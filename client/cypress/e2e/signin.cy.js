describe('User login functionality', () => {
    beforeEach(() => {
        // Clear cookies
        cy.clearCookies();
        // Clear local and session storage
        cy.clearLocalStorage();
        cy.reload();
        cy.visit('/');
    });

    it('should let the user sign in', () => {
        cy.contains('Login').click();
        cy.get('input#email').type('okay@okay.com');
        cy.get('input#password').type('123456');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/Food');
    });


});