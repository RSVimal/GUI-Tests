# GUI-Tests

Steps followed for API testing:

Step 1: Launch the website on the chrome browser

Step 2: Open the chrome developer tools and go the networks tab

Step 3: On the networks tab we can find the endpoints, payload, request, method and response
![image](https://user-images.githubusercontent.com/42145218/142796917-e679748e-55f7-48a7-833d-e6f250853846.png)
 
Step 4: On the spec file cy.request() is used to make the http request for any URL

For get method - We need to make http request and validate whether the response is the expected one or not

For post method - We need to make the http request along with the JSON body(which is the payload) and header then we need to check whether the request is the expected one or not


Test assertions:

expect(response).to.have.property('status',200) - Used to validate the status of the response =. The status should always be 200, so that it will have some resource as the response
            
expect(response.body).to.not.be.null - Used to validate that the body of the response is not null

its('headers').its('x-frame-options').should('include','SAMEORIGIN') - Used to validate whether the response header is the expected one or not
       

Steps followed for GUI testing:

Step 1: Launch the URL using cy.visit

Step 2: Get all the UI components using the css's id or class selector

Step 3: Navigate to the user flow and to check whether everything working fine.

Login >  Account Overview > Bill pay > Transfer funds > Open new account 

Test assertions:

.should('have.text','some string') - Used to validate whether the expected text is provided for the component

.should('be.visible') - Used to validate whether the text is visible or not

Tried the below logic to validate whether the "available balance" is equal to the "total balance" but the unable to get the values

 cy.get('th').should('length','3')
       cy.get('tr td:nth-child(3)').each(($e1) => {
       let sum=0
       sum = sum + ($el.text().split('$'))        
       })
       cy.get(':nth-child(5) > :nth-child(2) > .ng-binding').invoke('text').then((totalbalance) => {
       expect(+totalbalance).to.equal(sum)
       })

Methods and properties used:

describe() - Used to hold all the test cases, simply describe is like the test suite

it() - Used to hold script for individual test cases

cy.session() - Used to caching the login session, in order to avoid login for each individual test cases

cy.visit() - Used to launch the URL

cy.get() - Used to get the component on the webpage

beforeEach() - Used to run something before all test cases

click() - Used to click the button on the page

.should('have.text','some string') - Used to validate whether the expected text is provided for the component

.should('be.visible') - Used to validate whether the text is visible or not

type() - Used to enter the text on the text input field

cy.select() - Used to select the particular value on the drop down

