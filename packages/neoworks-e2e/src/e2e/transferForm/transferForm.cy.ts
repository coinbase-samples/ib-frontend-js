describe('neoworks: TransferForm component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=transferform--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TransferForm!');
    });
});
