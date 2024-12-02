class CheckoutPage {

    checkoutForm(firstName, lastName, companyName, countryName, billingAdress1, billingAdress2, cityName, billingState, zipCode, phoneNumber) {
        cy.get('#billing_first_name').clear().type(firstName)
        cy.get('#billing_last_name').clear().type(lastName)
        cy.get('#billing_company').clear().type(companyName)
        cy.get('#select2-billing_country-container').type(countryName).click()
        cy.get('#billing_address_1').clear().type(billingAdress1)
        cy.get('#billing_address_2').clear().type(billingAdress2)
        cy.get('#billing_city').clear().type(cityName)
        cy.get('#select2-billing_state-container').type(billingState).click()
        cy.get('#billing_postcode').clear().type(zipCode)
        cy.get('#billing_phone').clear().type(phoneNumber)
        cy.get('#terms').click()
        cy.get('#place_order').click()
    }

} export default new CheckoutPage()