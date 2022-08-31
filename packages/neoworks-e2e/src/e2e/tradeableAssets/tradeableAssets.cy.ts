describe('neoworks: TradeableAssets component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tradeableassets--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TradeableAssets!');
    });
});
