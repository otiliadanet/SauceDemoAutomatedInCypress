//Login into saucedemo and add 3 products to the cart -> Validate cart content (at least 3 products are in the cart) -> Remove 1 product -> Order

// npx cypress open

describe('SauceDemo automation test', () => {
    beforeEach(() => {
      //cy.visit('https://www.saucedemo.com/'); 
      cy.visit("/"); //because I added the base URL in cypress.config.js
    });
  
    it('Logins, adds 3 items, removes 1 and places the order', () => {
      cy.get('[id="user-name"]').type('standard_user'); 
      cy.get('[id="password"]').type('secret_sauce'); 
      cy.get('[id="login-button"]').click(); 
  
      cy.url().should('include', '/inventory.html');  //check that login was successful

      cy.get('[id="add-to-cart-sauce-labs-backpack"]').click();    //add 1 backpack
      cy.get('[id="add-to-cart-sauce-labs-bike-light"]').click();  //add 1 bike light
      cy.get('[id="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();  //add 1 orange blouse

      //verify the 3 items were added to the cart:
      cy.get('.shopping_cart_badge').should('have.text', '3');  // .shopping_cart_badge means class shopping_cart_badge

      //remove the backpack:
      cy.get('[id="remove-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('have.text', '2'); // verify that it remained only 2 items in the cart


      //place the order:
      cy.get('[data-test="shopping-cart-badge"]').click(); //enter shopping cart
    
      cy.get('[id="checkout"]').click();  //click on the Checkout button

      cy.get('[id="first-name"]').type('Otilia'); 
      cy.get('[id="last-name"]').type('Danet'); 
      cy.get('[id="postal-code"]').type('300066');
    
      cy.get('[id="continue"]').click(); //click on the Continue button

      cy.get('[id="finish"]').click();   //click on the Finish button

    });

  });
  
