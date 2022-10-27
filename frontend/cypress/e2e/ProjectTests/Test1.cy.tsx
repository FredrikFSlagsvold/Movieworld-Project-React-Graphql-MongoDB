/// <reference types="cypress" />


//Before each. cy.visit(":....")

beforeEach(() => {
    cy.visit("localhost:3000");
})

describe("Test Page Loading", () => {
    it("successfully loads", () => {
        cy.visit("localhost:3000")
    })

    it("Login", () => {
        cy.visit("localhost:3000") //glemmer hvor den er mellom hver test 
        cy.get("[data-testid=username]").type("mari")
        cy.get("[data-testid=password]").type("123")
        cy.get("[data-testid=loginButton]").click()
        //assertTrue at filmer vises eks.

        //bruke .should() og .contains()



    })



})