/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('minha-conta')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    cy.fixture('perfil').then((dados) => {
        cy.login(dados.usuario, dados.senha)
        cy.get('#tbay-main-content').should('contain', 'Olá, aluno_ebac (não é aluno_ebac? Sair)')
// rotina de escolher o primeiro produto

        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('.product-block').first().click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Yellow').click()
        cy.get('.button-variable-item-Yellow').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', '“Aero Daily Fitness Tee” foi adicionado no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        //cy.get('.product-name > a'). should('contain','Aero Daily Fitness Tee - XS, Yellow')
    })
    //cy.get('.page-title').should('contain', 'Minha conta')
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
      
  });


})