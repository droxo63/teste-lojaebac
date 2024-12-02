/// <reference types="cypress" />
import productChoice from "../support/page_objects/productChoicePage";
import checkoutPage from "../support/page_objects/checkoutPage";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        productChoice.visitUrl(); // Chama o método visitUrl
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta com massa de dados fixa', () => {
        productChoice.login();//faz o login
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, diego (não é diego? Sair)')
        // rotina de escolher o primeiro produto
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('.breadcrumb').should('contain', 'Produtos')
        productChoice.firstProduct('XS', 'Yellow', 1)
        cy.get('.woocommerce-message').should('contain', '“Aero Daily Fitness Tee” foi adicionado no seu carrinho.')
        // rotina de escolher o segundo produto
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('.breadcrumb').should('contain', 'Produtos')
        productChoice.newProduct('Aero Daily Fitness Tee', 'S', 'Brown', 1)
        cy.get('.woocommerce-message').should('contain', '“Aero Daily Fitness Tee” foi adicionado no seu carrinho.')
        // rotina de escolher o terceiro produto
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('.breadcrumb').should('contain', 'Produtos')
        productChoice.plusProduct('Apollo Running Short', '34', 'Black', 1)
        cy.get('.woocommerce-message').should('contain', '“Apollo Running Short” foi adicionado no seu carrinho.')
        // rotina de escolher o ultimo produto
        let qtd = 2
        productChoice.lastProduct('Zeppelin Yoga Pant', '34', "Blue", qtd)
        cy.get('.product_title').should('contain', 'Zeppelin Yoga Pant')
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Zeppelin Yoga Pant” foram adicionados no seu carrinho.')
        //rotina ir para o carrinho e checkout
        cy.get('.woocommerce-message > .button').click()
        cy.get('h2').should('contain', 'Total no carrinho')
        cy.get('.checkout-button').click()
        cy.get('.breadcrumb > .active').should('contain', 'Checkout')
        //rotina de preencher o checkout e finalizar a compra
        checkoutPage.checkoutForm("Diego", "Pereira", 'Ebac', "Brasil", "Avenida Paulista", "114", "Sao Paulo", "São Paulo", "06764-070", "11956564545")
        cy.wait(5000)
        cy.get(".woocommerce-notice--success").should("contain", 'Obrigado. Seu pedido foi recebido.')
    })

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta usando massa de dados dinamica (fixtures)', () => {
    productChoice.login();//faz o login
     cy.get('.page-title').should('contain', 'Minha conta')
     cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, diego (não é diego? Sair)')
        cy.fixture('products').then(dados => {
            // rotina de escolher o primeiro produto
            cy.get('#primary-menu > .menu-item-629 > a').click()
            cy.get('.breadcrumb').should('contain', 'Produtos')
            productChoice.newProduct(dados[0].nomeProduto, dados[0].tamanho, dados[0].cor, dados[0].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
            // rotina de escolher o segundo produto
            cy.get('#primary-menu > .menu-item-629 > a').click()
            cy.get('.breadcrumb').should('contain', 'Produtos')
            productChoice.newProduct(dados[1].nomeProduto, dados[1].tamanho, dados[1].cor, dados[1].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
            // rotina de escolher o terceiro produto
            cy.get('#primary-menu > .menu-item-629 > a').click()
            cy.get('.breadcrumb').should('contain', 'Produtos')
            productChoice.newProduct(dados[2].nomeProduto, dados[2].tamanho, dados[2].cor, dados[2].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
            // rotina de escolher o ultimo produto
            productChoice.lastProduct(dados[3].nomeProduto, dados[3].tamanho, dados[3].cor, dados[3].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)
        })
        //rotina ir para o carrinho e checkout
            cy.get('.woocommerce-message > .button').click()
            cy.get('h2').should('contain', 'Total no carrinho')
            cy.get('.checkout-button').click()
            cy.get('.breadcrumb > .active').should('contain', 'Checkout')
        //rotina de preencher o checkout e finalizar a compra
        cy.fixture('autoFields').then(autoFields => {
            checkoutPage.checkoutForm(autoFields.firstName, autoFields.lastName, autoFields.companyName, autoFields.countryName, autoFields.billingAdress1, autoFields.billingAdress2, autoFields.cityName, autoFields.billingState, autoFields.zipCode, autoFields.phoneNumber)
            cy.wait(5000)
            cy.get(".woocommerce-notice--success").should("contain", 'Obrigado. Seu pedido foi recebido.')
        })

    })
});





