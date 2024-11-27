Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function (){
    cy.get('#firstName').type("Eduardo")
    cy.get('#lastName').type("Chagas")
    cy.get('#email').type("teste@teste.com")
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type("teste")
    cy.get('.button[type="submit"]').click()
   
})