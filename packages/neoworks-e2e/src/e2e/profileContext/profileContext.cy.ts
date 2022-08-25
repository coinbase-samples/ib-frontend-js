describe('neoworks: ProfileProvider component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=profileprovider--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ProfileProvider!');
    });
});
