describe('neoworks: Portfolio component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=portfolio--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Portfolio!');
    });
});
