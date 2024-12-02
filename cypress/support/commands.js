Cypress.Commands.add('login', (usuario, senha) => {
    cy.get("[name='username']").type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

