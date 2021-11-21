/// <reference types="cypress" />
describe('Account overview',()=>{
  const login = ()=>{
    let username='test'
    let password='test123'
    cy.session([username, password], () => {
      cy.visit('https://parabank.parasoft.com/parabank/index.htm')
      cy.get(':nth-child(2) > .input').type(username)
      cy.get(':nth-child(4) > .input').type(password)
      cy.get(':nth-child(5) > .button').click()
    })
    cy.visit('https://parabank.parasoft.com/parabank/index.htm')
  } 
  beforeEach(()=>
  {
    login()
  })
  it('Account overview validation',()=>{
      cy.get('#leftPanel > ul > :nth-child(2) > a').click()
      //page heading text check
      cy.get('.title').should('have.text','Accounts Overview')
      //table header1 text check
      cy.get('thead > tr > :nth-child(1)').should('have.text','Account').should('be.visible')
      //table header2 text check
      cy.get('thead > tr > :nth-child(2)').should('have.text','Balance*').should('be.visible')
      //table header3 text check
      cy.get('thead > tr > :nth-child(3)').should('have.text','Available Amount').should('be.visible')
      //cy.get('tbody > :nth-child(1) > :nth-child(2)').invoke('text').then((text)=>{
      // text.should('have.text','$315.50')
      cy.get('thead > tr > :nth-child(3)').should('have.text','Available Amount').should('be.visible')   
       
      //Tried the below logic to validate whether the "available balance" is equal to the "total balance" but the unable to get the values
      
      /*
       cy.get('th').should('length','3')
       cy.get('tr td:nth-child(3)').each(($e1) => {
       let sum=0
       sum = sum + ($el.text().split('$'))        
       })
       cy.get(':nth-child(5) > :nth-child(2) > .ng-binding').invoke('text').then((totalbalance) => {
       expect(+totalbalance).to.equal(sum)
       })
      */
     })

  /*--Bill pay flow validation--*/
  it('Billpay flow validation',()=>{
      cy.get('#leftPanel > ul > :nth-child(4) > a').click()
      cy.get(':nth-child(1) > [width="20%"]').type('xyz')
      cy.get(':nth-child(2) > [width="20%"] > .input').type('1st street')
      cy.get(':nth-child(3) > [width="20%"] > .input').type('chennai')
      cy.get(':nth-child(4) > [width="20%"] > .input').type('tamilnadu')
      cy.get(':nth-child(5) > [width="20%"] > .input').type('12345')
      cy.get('input[name="payee.phoneNumber"]').type('8000-1612023')
      cy.get(':nth-child(8) > :nth-child(2) > .input').type('45678')
      cy.get(':nth-child(9) > [width="20%"] > .input').type('45678')
      cy.get(':nth-child(11) > [width="20%"] > .input').type('50')
      cy.get(':nth-child(13) > :nth-child(2) > .input').select(0)
      cy.get(':nth-child(14) > :nth-child(2) > .button').click()
    }) 

  /*--Fund transfer flow validation--*/
  it('Fund transfer',()=>{
    cy.get('#leftPanel > ul > :nth-child(3) > a').click()
    cy.get('.title').should('have.text','Transfer Funds').should('be.visible')
    cy.get(':nth-child(4) > .button').should('have.value','Transfer').should('be.visible')
    cy.get('#fromAccountId').select('20781')
    cy.get('#toAccountId').select('20781')
    cy.get('#amount').type('400')
    cy.get(':nth-child(4) > .button').click()
    cy.get('.title').should('have.text','Transfer Complete!').should('be.visible')
    cy.get('#amount').should('have.text','$400.00').should('be.visible')
    cy.get('#fromAccountId').should('have.text','20781').should('be.visible')
    cy.get('#toAccountId').should('have.text','20781').should('be.visible')
})

  /*--Fund transfer flow error validation--*/
  it('Fund transfer Error validation',()=>{
    cy.get('#leftPanel > ul > :nth-child(3) > a').click()
    cy.get('#fromAccountId').select('20781')
    cy.get('#toAccountId').select('20781')
    cy.get(':nth-child(4) > .button').click()
    //cy.get('#amount.errors').should('have.text','')
})

  /*--Opening checking account flow validation--*/
  it('Opening checking account',()=>{
  cy.get('#leftPanel > ul > :nth-child(1) > a').click()
  cy.get('#type').select('CHECKING')
  cy.get('#fromAccountId').select('20781')
  cy.get('input[type="submit"]').click()
})

  /*--Open checking account flow validation--*/
  it('Opening saving account',()=>{
  cy.get('#leftPanel > ul > :nth-child(1) > a').click()
  cy.get('#type').select('SAVINGS')
  cy.get('#fromAccountId').select('20781')
  cy.get('input[type="submit"]').click()
})
})