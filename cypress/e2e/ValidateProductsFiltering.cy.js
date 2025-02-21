// npx cypress open

describe('SauceDemo automation test', () => {

    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/'); 
      cy.get('[id="user-name"]').type('standard_user'); 
      cy.get('[id="password"]').type('secret_sauce'); 
      cy.get('[id="login-button"]').click(); 
      cy.url().should('include', '/inventory.html'); 
    });
  

    it('validate products filtering methods: sorting by Name (A to Z)', () => {
      
      cy.get('.product_sort_container').select('Name (A to Z)');  //select filter option 

      cy.get('.inventory_item_name').then(($items) => {   
        const productNames = $items.map((index, element) => Cypress.$(element).text()).get(); //productNames is of type array
        
        productNames.forEach((currentItem, index) => {
            cy.log(` Product at index  ${index}  has name:  ${currentItem}  `);
        }); 

        const sortedProducts = [...productNames].sort();    //expected sorted order; By default, sort() method sorts the elements as strings in ascending (A → Z) order, even if the elements are numbers.
            
        expect(productNames).to.deep.equal(sortedProducts); //In Chai (Cypress’s assertion library), expect(A).to.deep.equal(B); checks whether two objects or arrays have the same structure and values, rather than just being the same reference in memory.

      });
    });

    //start new filter method here.....
    it('validate products filtering methods: sorting by Name (Z to A)', () => {
      
      cy.get('.product_sort_container').select('Name (A to Z)');
      cy.get('.inventory_item_name').then(($items) => {   
        const productNamesDefaultOrder = $items.map((index, element) => Cypress.$(element).text()).get();

        // Store the default order in a Cypress alias so that it can be used below, outside of the .then() block
        cy.wrap(productNamesDefaultOrder).as('defaultOrder');
      });
  

      cy.get('.product_sort_container').select('Name (Z to A)'); 
      cy.get('.inventory_item_name').then(($items) => {   
        const productNamesZA = $items.map((index, element) => Cypress.$(element).text()).get(); 
        
        productNamesZA.forEach((currentItem, index) => {
            cy.log(` Product at index  ${index}  has name:  ${currentItem}  `);
        }); 

        
        // Retrieve the stored default order from the alias
        cy.get('@defaultOrder').then((productNamesDefaultOrder) => {
          const sortedProductsZA = productNamesDefaultOrder.reverse();
          expect(productNamesZA).to.deep.equal(sortedProductsZA); 
        });

      });
    });
  
}); //end of describe