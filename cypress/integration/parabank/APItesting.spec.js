describe('API Testing',()=>{
    const login = ()=>{
        let username='test'
        let password='test123'
        cy.session([username, password], () => {
        cy.request({
          method: 'POST',
          url: 'https://parabank.parasoft.com/parabank/index.htm',
          body: { username, password },
        }).then(({ body }) => {
          window.localStorage.setItem('authToken',body.token)
        })
      })
    }
    beforeEach(()=>
    {
    login()
    })
    it('Status and not null',()=>
    {
        cy.request('https://parabank.parasoft.com/parabank/index.htm').then((response)=>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
        })
    })
    it('Header content',()=>
    {
        cy.request('https://parabank.parasoft.com/parabank/index.htm').its('headers').its('content-type').should('include','text/html;charset=ISO-8859-1')
        cy.request('https://parabank.parasoft.com/parabank/index.htm').its('headers').its('x-frame-options').should('include','SAMEORIGIN')
       
    })
    //https://parabank.parasoft.com/parabank/services_proxy/bank/createAccount?customerId=15098&newAccountType=1&fromAccountId=20781
    it('Open account post',()=>
    {
        cy.wait(20000)
        cy.request({
            method:'POST',
            url: 'https://parabank.parasoft.com/parabank/services_proxy/bank/createAccount?customerId=15098&newAccountType=1&fromAccountId=20781',
            body:
            {
                "customerId":'15098',
                "newAccountType":'1',
                "fromAccountId":'20781'
            },
            headers:
            {
             "cookie":"JSESSIONID=91D3A5C1913970C30D208D2B61B09DB8; _ga=GA1.2.1561323680.1637216800; _gcl_au=1.1.1754755119.1637216844"
            }
        })

    })
    it('GET-Read',()=>
    {
        //cy.wait(20000)
        cy.request('https://parabank.parasoft.com/parabank/overview.htm').then((response)=>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
           // expect(response.body).to.have.property('Remote Address','[2606:4700:8dd7:efff:afdd:53:f8d3:a77]:443')
        })
        cy.request('https://parabank.parasoft.com/parabank/style.css').then((response)=>{
            expect(response).to.have.property('status',200)
            expect(response.body).to.not.be.null
        })
    })  
})  
