describe('neoworks: Trades component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=trades--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Trades!');
    });
});
