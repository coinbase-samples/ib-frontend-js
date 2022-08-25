describe('neoworks: Landing component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=landing--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Landing!');
    });
});
