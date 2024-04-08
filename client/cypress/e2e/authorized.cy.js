Cypress.Commands.add('login', (username, password) => {
    cy.clearCookies();
    // Clear local and session storage
    cy.clearLocalStorage();
    cy.reload();
    cy.visit('/');
    cy.contains('Login').click();
    cy.get('input#email').type('okay@okay.com');
    cy.get('input#password').type('123456');
    cy.get('button[type="submit"]').click();
    cy.wait(10000);
})

describe('User account page', () => {

    beforeEach(() => {
        cy.login('okay@okay.com', '123456')
    })

    it('should go to user settings', () => {
        cy.visit('/user-profile')
    })

    // it('should have the correct page title', () => {
    //     cy.visit('/user-profile')
    //     cy.title().should('eq', 'Settings')
    // })

})