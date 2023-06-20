describe('Conctructor', () => {
  it('Должно быть запущено по адресу localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });
})