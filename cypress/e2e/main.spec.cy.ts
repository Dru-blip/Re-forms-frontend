describe("Test App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get("[placeholder='m@example.com']").should("exist");
        cy.get("[placeholder='password']").should("exist");
        cy.get("[placeholder='m@example.com']").type("pika@gmail.com");
        cy.get("[placeholder='password']").type(".Adgjmptw5");

        cy.contains("Sign in").click();
    });

    context("Test Form Creation", () => {
        it("create form", () => {
            cy.get('[test-id="createForm"]').click();

            cy.get('[placeholder="Enter Title"]').type("Test Form");
            cy.get('[placeholder="Enter Description"]').type("Test Description");
            cy.get('[test-id="create"]').click();
        });
    });

    context("Test Form Deletion", () => {
        it("delete form", () => {
            cy.get('[data-test-id="delete-form-trigger"]').last().should("exist").click()
            cy.get('[data-test-id="delete-form-action"]').click();
        });
    });
});
