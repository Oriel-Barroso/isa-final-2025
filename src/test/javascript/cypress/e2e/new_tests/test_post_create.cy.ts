import { entityItemSelector } from '../../support/commands';

describe('Crear Post', () => {
  const postTitle = `Test Post ${Date.now()}`;
  const postContent = 'Este es un contenido de prueba creado con Cypress';

  beforeEach(() => {
    // Usar el comando login existente en lugar de loginByApi
    cy.login('admin', 'admin');
    cy.visit('/');
  });

  it('debería crear un nuevo post correctamente', () => {
    // Navegar a la página de creación de posts
    cy.get(entityItemSelector).click();
    cy.contains('Post').click();
    cy.get('[data-cy="entityCreateButton"]').click();

    // Completar el formulario
    cy.get('#field_title').type(postTitle);
    cy.get('#field_content').type(postContent);
    cy.get('#field_date').type('2025-02-27T12:00');

    // Enviar el formulario
    cy.get('[data-cy="entityCreateSaveButton"]').click();

    // Verificar que se creó correctamente
    cy.contains('A new Post is created with identifier').should('be.visible');

    // Verificar que aparece en la lista
    cy.contains(postTitle).should('be.visible');
  });
});
