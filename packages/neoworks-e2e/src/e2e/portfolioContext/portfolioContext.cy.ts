describe('neoworks: PortfolioProvider component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=portfolioprovider--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to PortfolioProvider!');
    });
});
