// npx cypress open

describe('Learning arrays in Cypress', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/'); 
      cy.get('[id="user-name"]').type('standard_user'); 
      cy.get('[id="password"]').type('secret_sauce'); 
      cy.get('[id="login-button"]').click(); 
      cy.url().should('include', '/inventory.html'); 
    });
  

    it('Print products sorted by Name (A to Z)', () => {
    
      cy.get('.inventory_item_name').then(($items) => {
        const productNames = $items.map((index, element) => Cypress.$(element).text()).get(); //productNames is of type array

        cy.log('1----BEFORE printing the product names');
        // Log each product name:
        productNames.forEach((currentItem, index) => {
            cy.log(` Product at index  ${index}  is:  ${currentItem}  `);
        });
        
        cy.log('2----AFTER printing the product names');
        //console.log(`Product ${index}: ${name}`); // logs to the browser console

      });
    });

});
  
