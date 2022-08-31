describe('neoworks: AssetProvider component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=assetprovider--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AssetProvider!');
    });
});
