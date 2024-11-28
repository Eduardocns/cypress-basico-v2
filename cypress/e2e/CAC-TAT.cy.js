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
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should("be.visible")

    
  })
  it('preenche os campos obrigatórios email inválido', () => {
    const longTest = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste,Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste"
  
    cy.get('#firstName').type("Eduardo")
    cy.get('#lastName').type("Chagas")
    cy.get('#email').type("teste@teste,com")
    cy.get('#open-text-area').type(longTest, {delay: 0})//delay rodar mais rápido textos grandes
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should("be.visible")
 
  })
  it("Campo telefone contiunua vazio quando preenchido com valor não numérico", () =>{
    cy.get("#phone")
      .type('abcdefghij')
      .should('have.value', '')
  })
  it.only('Exibe mensagem de erro quando o telefone se torna obrigatorio, mas não é preenchido antes do envio do formulario', () => {
    
    cy.get('#firstName').type("Eduardo")
    cy.get('#lastName').type("Chagas")
    cy.get('#email').type("teste@teste.com")
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type("teste")
    cy.contains('button', 'Enviar').click()
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
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('Envia o formulário com sucesso usando um comando customizado', () =>{
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should("be.visible")
  })
  it('seleciona um produto (YouTube) por seu texto', () =>{
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('Seleciona um produto (Mentoria) por seu indice', ()=>{
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('Seleciona um produto (Blog) por seu indice', ()=>{
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  it('Marcar tipo de atendimento feedback', ()=>{
    cy.get('input[type="radio"][value="feedback"]')
    .check()
      .should('have.value', 'feedback')
  })
  it('Marcar cada tipo de atendimento', ()=>{
    cy.get('input[type="radio"]')
    .check()
     .should('have.length', 3)
     .each(function($radio){
      cy.wrap($radio).check()
      .should('be.checked')
     })
  })
  it('marca ambos checkbox, depois desmarca o último', ()=>{
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })
})