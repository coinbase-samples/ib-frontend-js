describe('neoworks: OrderProvider component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=orderprovider--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to OrderProvider!');
    });
});
