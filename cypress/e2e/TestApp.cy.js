describe('Conctructor', () => {
  const email = "status187@yandex.ru";
  const password = "123123"
  
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(1920, 1080);
  });

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

  it("Открыть модальное окно c ингредиентом, и закрыть", () => {
    const ingredientModal = (index) => {
      cy.get('[data-testid="ingredient"]').eq(index).click();
      cy.get('[data-testid="close-modal-button"]').click();
    };
    ingredientModal(1);
  });

  it('Создание заказа должно отрабатывать корректно', function () {

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

    cy.get('[data-testid="place-an-order"]').click();

    cy.get('[data-testid="email-entrance"]').type(`${email}{enter}`);
    cy.get('[data-testid="password-entrance"]').type(`${password}{enter}`);

    cy.get('[data-testid="home-page"]').click();
    cy.get('[data-testid="home-page"]').click();
    
    cy.get('[data-testid="place-an-order"]').click();
  });
});
