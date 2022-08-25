describe('neoworks: YourAssets component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=yourassets--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to YourAssets!');
    });
});
