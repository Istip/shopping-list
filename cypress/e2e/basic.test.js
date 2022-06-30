describe('FIRST TEST SUITE', () => {
  it('App should start', () => {
    cy.visit('/');
    cy.get('[data-cy="main-title"]').should('contain', 'Our List');
  });
});
