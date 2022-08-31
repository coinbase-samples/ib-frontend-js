describe('neoworks: Icons component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=icons--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Icons!');
    });
});
