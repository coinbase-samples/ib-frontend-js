describe('neoworks: BalanceChart component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=balancechart--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to BalanceChart!');
    });
});
