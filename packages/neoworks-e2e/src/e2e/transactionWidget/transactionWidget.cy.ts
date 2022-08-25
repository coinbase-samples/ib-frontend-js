describe('neoworks: TransactionWidget component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=transactionwidget--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TransactionWidget!');
    });
});
