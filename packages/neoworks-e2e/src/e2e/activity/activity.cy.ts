describe('neoworks: Activity component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=activity--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Activity!');
    });
});
