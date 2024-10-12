describe("Logout", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get("[placeholder='m@example.com']").should("exist");
        cy.get("[placeholder='password']").should("exist");
        cy.get("[placeholder='m@example.com']").type("pika@gmail.com");
        cy.get("[placeholder='password']").type(".Adgjmptw5");

        cy.contains("Sign in").click();
    });
    context("Test user logout", () => {
        it("check logout button", () => {
            cy.contains("Logout").should("exist").click()
        });
    });
});
