describe('neoworks: OrderId component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=orderid--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to OrderId!');
    });
});
