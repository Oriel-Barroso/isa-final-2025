import { entityItemSelector } from '../../support/commands';

describe('Ver Posts', () => {
  const uniqueTitle = `Post para ver ${Date.now()}`;
  const uniqueContent = 'Este post es para probar la visualización de detalles';

  before(() => {
    cy.login('admin', 'admin');

    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/posts',
      body: {
        title: uniqueTitle,
        content: uniqueContent,
        date: new Date().toISOString(),
      },
    });

    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/posts',
      body: {
        title: `Otro post ${Date.now()}`,
        content: 'Contenido adicional',
        date: new Date().toISOString(),
      },
    });
  });

  it('debería mostrar la lista de posts y permitir ver detalles', () => {
    cy.login('admin', 'admin');
    cy.visit('/');

    cy.get(entityItemSelector).click();
    cy.contains('Post').click();

    cy.get('tbody tr').should('have.length.at.least', 2);

    cy.contains(uniqueTitle).should('be.visible');

    cy.contains('tr', uniqueTitle).find('[data-cy="entityDetailsButton"]').click();

    cy.contains('dl.jh-entity-details dd', uniqueTitle).should('be.visible');
    cy.get('dl.jh-entity-details').within(() => {
      cy.contains(uniqueTitle).should('be.visible');
      cy.contains(uniqueContent).should('be.visible');
    });

    cy.get('[data-cy="entityDetailsBackButton"]').click();
  });

  after(() => {
    cy.login('admin', 'admin');
    cy.authenticatedRequest({
      method: 'GET',
      url: '/api/posts',
    }).then(response => {
      interface Post {
        id: number;
        title: string;
      }
      const postsToDelete = response.body.filter((p: Post): boolean => p.title === uniqueTitle || p.title.startsWith('Otro post'));

      postsToDelete.forEach((post: Post) => {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `/api/posts/${post.id}`,
        });
      });
    });
  });
});
