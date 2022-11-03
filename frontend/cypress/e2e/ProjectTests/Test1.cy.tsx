/// <reference types="cypress" />

beforeEach(() => {
    cy.visit("http://it2810-20.idi.ntnu.no/project3/");
})

describe("Test Page Loading", () => {
    it("successfully loads", () => {
        cy.visit("http://it2810-20.idi.ntnu.no/project3/")
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
        cy.get('[id="CategoryField"]').click()
        cy.get('[data-testid="filterOption"]').eq(0).click()
        cy.get('[data-testid="searchField"]').type("Lord of the rings")
        cy.wait(2000)
        cy.get('[data-testid=singleMovieDiv]').should('have.length', 3)
        cy.get("[data-testid=singleMovieDiv]").eq(0).click()
        cy.contains("The Lord of the Rings")
    })

    it("Lord does not work for cast category", () => {
        cy.get('[id="CategoryField"]').click()
        cy.get('[data-testid="filterOption"]').eq(1).click()
        cy.get('[data-testid="searchField"]').type("Lord of the rings")
        cy.get('[data-testid=singleMovieDiv]').should('have.length', 0)
    })

    it("Actor category works for actor names", () => { 
        cy.get('[id="CategoryField"]').click()
        cy.get('[data-testid="filterOption"]').eq(1).click()
        cy.get('[data-testid="searchField"]').type("Tom Holland")
        cy.wait(2000)
        cy.get('[data-testid=singleMovieDiv]').should('have.length', 8)
    })

    it("Actor names gives zero results in Category field", () => {
        cy.get('[id="CategoryField"]').click()
        cy.get('[data-testid="filterOption"]').eq(2).click()
        cy.get('[data-testid="searchField"]').type("Tom Holland")
        cy.get('[data-testid=singleMovieDiv]').should('have.length', 0)
    })

    it("Animation-category gives results in Cateogry field", () => {
        cy.get('[id="CategoryField"]').click()
        cy.get('[data-testid="filterOption"]').eq(2).click()
        cy.get('[data-testid="searchField"]').type("Animation")
        cy.wait(2000)
        cy.get("[data-testid=singleMovieDiv]").eq(0).click()
        cy.contains("Raya")
    })

    it("Sort field changes the order of movies", () => {
        cy.get("[data-testid=singleMovieDiv]").eq(0).click()
        cy.contains("Godzilla")
        cy.wait(1500)
        cy.get("[data-testid=HomePageLink]").click()
        cy.get("[data-testid=sortOptionBar]").click()
        cy.get("[data-testid=sortOption]").eq(1).click()
        cy.wait(1000)
        cy.get("[data-testid=singleMovieDiv]").eq(0).click()
        cy.contains("A Trip to the Moon")
    })
})

describe("Test like movies function", () => {
    it("Movie not in liked movies page", () =>{
        cy.get('[data-testid="LikedMoviesLink"]').click()
        cy.wait(2000)
        cy.contains('Crazy About Her').should('not.exist')
    })
    it("Crazy About Her in list of liked movies", () => {
        cy.get("[data-testid=singleMovieDiv]").eq(5).click()
        cy.get('[data-testid="FavoriteButton"]').click()
        cy.get('[data-testid="LikedMoviesLink"]').click()
        cy.wait(2000)
        cy.contains('Crazy About Her').should('exist')
        cy.get("[data-testid=singleMovieDiv]").eq(-1).click()
        cy.get('[data-testid="FavoriteButton"]').click()
    })
})