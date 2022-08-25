describe('neoworks: TradeForm component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tradeform--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TradeForm!');
    });
});
