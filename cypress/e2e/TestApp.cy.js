describe('Conctructor', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(1920, 1080);
  })

  it('Должно быть запущено по адресу localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });

  it("Должно прокрутиться по нажатию на таб 'Соусы'", () => {
    cy.get("[class^=tab]").contains("Соусы").click();
    cy.contains("Соус с шипами Антарианского плоскоходца");
  });

  it("Должно прокрутиться по нажатию на таб 'Начинки'", () => {
    cy.get("[class^=tab]").contains("Начинки").click();
    cy.contains("Биокотлета из марсианской Магнолии");
  });

  it('Drag & Drop должен отрабатывать корректно', function () {

    const dragAndDropBunUp = (index) => {
      cy.get('[data-testid="ingredient"]').eq(index).trigger('dragstart');
      cy.get('[data-testid="up-bun"]').trigger('drop');
    };

    const dragAndDropBunDown = (index) => {
      cy.get('[data-testid="ingredient"]').eq(index).trigger('dragstart');
      cy.get('[data-testid="down-bun"]').trigger('drop');
    };

    dragAndDropBunUp(0)
    dragAndDropBunDown(1)

    const dragAndDropIngredients = (index) => {
      cy.get('[data-testid="ingredient"]').eq(index).trigger('dragstart');
      cy.get('[data-testid="drop-target"]').trigger('drop');
    };

    for (let i = 0; i <= 9; i++) {
      dragAndDropIngredients(i)
    }
  });

})
