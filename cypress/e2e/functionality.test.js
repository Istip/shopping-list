describe('FUNCTIONALITY TEST SUITE', () => {
  beforeEach('Visit the main route', () => {
    cy.visit('/');
  });

  it('Submitting form works', () => {
    cy.get('[placeholder="Enter item name.."]').type('Item to submit');
    cy.get('button').last().click();
    cy.get('li').first().should('contain', 'Item to submit');
  });
});
