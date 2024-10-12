describe("Test Form Editor", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
        cy.get("[placeholder='m@example.com']").should("exist");
        cy.get("[placeholder='password']").should("exist");
        cy.get("[placeholder='m@example.com']").type("pika@gmail.com");
        cy.get("[placeholder='password']").type(".Adgjmptw5");

        cy.contains("Sign in").click();
    });

    context("Test Open Form Editor", () => {
        it("open form editor", () => {
            cy.get('[data-test-id="edit-form-link"]').should("exist").last().click();

            cy.get('[data-test-id="add-question-btn"]').last().click();
        });

    });
});
