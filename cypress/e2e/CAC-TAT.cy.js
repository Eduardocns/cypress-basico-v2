///<reference types="Cypress" />

describe('template spec', () => {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longTest = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste"
  
    cy.get('#firstName').type("Eduardo")
    cy.get('#lastName').type("Chagas")
    cy.get('#email').type("teste@teste.com")
    cy.get('#open-text-area').type(longTest, {delay: 0})//delay rodar mais rápido textos grandes
    cy.get('.button[type="submit"]').click()
    cy.get('.success').should("be.visible")

    
  })
  it('preenche os campos obrigatórios email inválido', () => {
    const longTest = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste"
  
    cy.get('#firstName').type("Eduardo")
    cy.get('#lastName').type("Chagas")
    cy.get('#email').type("teste@teste,com")
    cy.get('#open-text-area').type(longTest, {delay: 0})//delay rodar mais rápido textos grandes
    cy.get('.button[type="submit"]').click()
    cy.get('.error').should("be.visible")
 
  })
  it("Campo telefone contiunua vazio quando preenchido com valor não numérico", () =>{
    cy.get("#phone")
      .type('abcdefghij')
      .should('have.value', '')
  })
  it('Exibe mensagem de erro quando o telefone se torna obrigatorio', () => {
    
    cy.get('#firstName').type("Eduardo")
    cy.get('#lastName').type("Chagas")
    cy.get('#email').type("teste@teste.com")
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type("teste")
    cy.get('.button[type="submit"]').click()
    cy.get('.error').should("be.visible")
 
  })
  it('Preencvhe e limpa os campos nome, sobrenome, email e telefone ',  () =>{
    cy.get('#firstName').type("Eduardo")
    .should('have.value', 'Eduardo')
    .clear()
    .should('have.value', '')
    cy.get('#lastName').type("Chagas")
    .should('have.value', 'Chagas')
    .clear()
    .should('have.value', '')
    cy.get('#email').type("teste@teste.com")
    .should('have.value', 'teste@teste.com')
    .clear()
    .should('have.value', '')
    cy.get('#open-text-area').type("teste")
    .should('have.value', 'teste')
    .clear()
    .should('have.value', '')
    cy.get('#phone').type(123456789)
    .should('have.value', 123456789)
    .clear()
    .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    cy.get('button[type="submit').click()

    cy.get('.error').should('be.visible')
  })
  it.only('Envia o formulário com sucesso usando um comando customizado', () =>{
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should("be.visible")
  })
})