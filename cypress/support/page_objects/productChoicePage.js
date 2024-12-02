class ProductChoice {
    visitUrl() {
        cy.visit('minha-conta'); // A URL deve ser válida e corresponder à sua aplicação
    }

    login() {
        cy.login("diego@teste.com", 'teste@123')


    }

    firstProduct(size, color, qtd) {

        cy.get('.product-block').first().click()
        cy.get('.button-variable-item-' + size).click()
        cy.get('.button-variable-item-' + color).click()
        cy.get('.input-text').clear().type(qtd)
        cy.get('.single_add_to_cart_button').click()
    }

    secondProduct(productName, size, color, qtd) {
        cy.get("[placeholder='Enter your search ...']").eq(1).type(productName)
        cy.get('.button-search').eq(1).click()
        cy.get('.product_title').should('contain', productName)
        cy.get('.button-variable-item-' + size).click()
        cy.get(".button-variable-item-" + color).click()
        cy.get('.input-text').clear().type(qtd)
        cy.get('.single_add_to_cart_button').click({ force: true })
    }

    newProduct(productName, size, color, qtd) {

        cy.get('.product-block').eq(3).click()
        cy.get('.product_title').should('contain', productName)
        cy.get('.button-variable-item-' + size).click()
        cy.get(`.button-variable-item-${color}`).click()
        cy.get('.input-text').clear().type(qtd)
        cy.get('.single_add_to_cart_button').click()

    }

    lastProduct(productName, size, color, qtd) {
        //cy.visit(`product/${productName}`)
        const urlFormatada = productName.replace(/ /g, '-')
        cy.visit(`products/${urlFormatada}`)
        cy.get('.button-variable-item-' + size).click()
        cy.get('.button-variable-item-' + color).click()
        cy.get('.input-text').clear().type(qtd)
        cy.get('.single_add_to_cart_button').click()
    }
}
export default new ProductChoice()