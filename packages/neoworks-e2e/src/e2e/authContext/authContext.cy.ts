describe('neoworks: AuthProvider component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=authprovider--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to AuthProvider!');
    });
});
