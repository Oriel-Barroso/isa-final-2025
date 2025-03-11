import { entityItemSelector } from '../../support/commands';

describe('Editar Post', () => {
  const initialTitle = `Post para editar ${Date.now()}`;
  const updatedTitle = `Post editado ${Date.now()}`;

  before(() => {
    cy.login('admin', 'admin');

    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/posts',
      body: {
        title: initialTitle,
        content: 'Contenido para editar',
        date: new Date().toISOString(),
      },
    });
  });

  it('debería editar un post existente', () => {
    cy.login('admin', 'admin');
    cy.visit('/');

    cy.get(entityItemSelector).click();
    cy.contains('Post').click();

    cy.contains('tr', initialTitle).find('[data-cy="entityEditButton"]').click();
    cy.get('#field_title').should('be.visible');

    cy.get('#field_title').clear();
    cy.get('#field_title').type(updatedTitle);

    cy.get('[data-cy="entityCreateSaveButton"]').click();

    cy.contains('A Post is updated with identifier').should('be.visible');
    cy.contains(updatedTitle).should('be.visible');
  });

  after(() => {
    cy.login('admin', 'admin');
    cy.authenticatedRequest({
      method: 'GET',
      url: '/api/posts',
    }).then(response => {
      const post = response.body.find(p => p.title === updatedTitle);
      if (post) {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `/api/posts/${post.id}`,
        });
      }
    });
  });
});
