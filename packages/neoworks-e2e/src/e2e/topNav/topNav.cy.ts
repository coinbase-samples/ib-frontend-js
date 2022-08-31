describe('neoworks: TopNav component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=topnav--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TopNav!');
    });
});
