/// <reference types="cypress" />

//Simulere at man kan like en film og kanskje at man kan lage ny bruker og logge inn med denne.
// https://github.com/cypress-io/cypress/issues/1805. Istedenfor å bruke wait() da dette ikke er helt ideelt.

beforeEach(() => {
    cy.visit("localhost:3000");
})

describe("Test Page Loading", () => {
    it("successfully loads", () => {
        cy.visit("localhost:3000")
    })

    it("Login", () => {
        cy.get("[data-testid=username]").type("mari")
        cy.get("[data-testid=password]").type("123")
        cy.get("[data-testid=loginButton]").click()
    })
})

describe("Test homepage", () => {
    it("Movies are shown", () => {
        cy.get("[data-testid=homePage]")
        cy.get("[data-testid=singleMovieDiv]")
    })  

    it("Moviepage appears when you click on a movie", () => {
        cy.get("[data-testid=singleMovieDiv]").eq(0).click()
        cy.contains("Directors")
        cy.contains("Description")
        cy.contains("Cast")
    })

    it("You can got to a similar movie from the moviepage", () => {
        cy.get("[data-testid=singleMovieDiv]").eq(0).click()
        cy.get("[data-testid=singleMovieDiv]").eq(0).click()
        cy.contains("Godzilla")
    })
})

describe("Test search bar", () => {
    it("Search bar works for movie category", () => {
        cy.get('[id="outlined-select-currency"]').click()
        cy.get('[data-testid="filterOption"]').eq(0).click()
        cy.get('*[class^="searchBar"]').type("Lord")
        cy.wait(2000)
        cy.get('[data-testid=singleMovieDiv]').should('have.length', 4)
        cy.get("[data-testid=singleMovieDiv]").eq(0).click()
        cy.contains("The Lord of the Rings")
    })

    it("Lord does not work for cast category", () => {
        cy.get('[id="outlined-select-currency"]').click()
        cy.get('[data-testid="filterOption"]').eq(1).click()
        cy.get('*[class^="searchBar"]').type("Lord")
        cy.get('[data-testid=singleMovieDiv]').should('have.length', 0)
    })

    it("Actor category works for actor names", () => { 
        cy.get('[id="outlined-select-currency"]').click()
        cy.get('[data-testid="filterOption"]').eq(1).click()
        cy.get('*[class^="searchBar"]').type("Tom Holland")
        cy.wait(2000)
        cy.get('[data-testid=singleMovieDiv]').should('have.length', 8)
    })

    it("Actor names gives zero results in Category field", () => {
        cy.get('[id="outlined-select-currency"]').click()
        cy.get('[data-testid="filterOption"]').eq(2).click()
        cy.get('*[class^="searchBar"]').type("Tom Holland")
        cy.get('[data-testid=singleMovieDiv]').should('have.length', 0)
    })

    it("Animation-category gives results in Cateogry field", () => {
        cy.get('[id="outlined-select-currency"]').click()
        cy.get('[data-testid="filterOption"]').eq(2).click()
        cy.get('*[class^="searchBar"]').type("Animation")
        cy.wait(2000)
        cy.get("[data-testid=singleMovieDiv]").eq(0).click()
        cy.contains("Raya")
    })
})

describe("Test like movies function", () => {
    it("Movie not in liked movies page", () =>{
        cy.get('[data-testid="LikedMoviesLink"]').click()
        cy.wait(2000)
        cy.contains('Mortal Kombat').should('not.exist')
    })
    it("Mortal Kombat in list of liked movies", () => {
        cy.get("[data-testid=singleMovieDiv]").eq(6).click()
        cy.get('[data-testid="FavoriteButton"]').click()
        cy.get('[data-testid="LikedMoviesLink"]').click()
        cy.wait(2000)
        cy.contains('Mortal Kombat').should('exist')
        cy.get("[data-testid=singleMovieDiv]").eq(-1).click()
        cy.get('[data-testid="FavoriteButton"]').click()
    })
})