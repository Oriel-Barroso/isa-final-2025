import { entityItemSelector } from '../../support/commands';

describe('Crear Post', () => {
  const postTitle = `Test Post ${Date.now()}`;
  const postContent = 'Este es un contenido de prueba creado con Cypress';

  beforeEach(() => {
    cy.login('admin', 'admin');
    cy.visit('/');
  });

  it('debería crear un nuevo post correctamente', () => {
    cy.get(entityItemSelector).click();
    cy.contains('Post').click();
    cy.get('[data-cy="entityCreateButton"]').click();

    cy.get('#field_title').type(postTitle);
    cy.get('#field_content').type(postContent);
    cy.get('#field_date').type('2025-02-27T12:00');

    cy.get('[data-cy="entityCreateSaveButton"]').click();

    cy.contains('A new Post is created with identifier').should('be.visible');

    cy.contains(postTitle).should('be.visible');
  });
});
