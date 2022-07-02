describe('BASIC TEST SUITE', () => {
  beforeEach('Visit the main route', () => {
    cy.visit('/');
  });

  it('App should start', () => {
    cy.get('[data-cy="main-title"]').should('contain', 'Our List');
    cy.get('button').first().should('contain', 'Show');
    cy.get('button').last().should('contain', 'Add to List');
  });

  it('You can type to the input field', () => {
    cy.get('[placeholder="Enter item name.."]').type('Item');
    cy.get('[placeholder="Enter item name.."]').should('have.value', 'Item');
  });
});
