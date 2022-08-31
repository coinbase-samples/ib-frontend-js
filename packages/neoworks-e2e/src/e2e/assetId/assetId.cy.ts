describe('neoworks: AssetId component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=assetid--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AssetId!');
    });
});
