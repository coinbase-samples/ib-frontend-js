describe('neoworks: OrderActivity component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=orderactivity--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to OrderActivity!');
    });
});
