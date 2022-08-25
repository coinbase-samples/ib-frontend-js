describe('neoworks: TradeModal component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=trademodal--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TradeModal!');
    });
});
