import { entityItemSelector } from '../../support/commands';

describe('Ver Posts', () => {
  const uniqueTitle = `Post para ver ${Date.now()}`;
  const uniqueContent = 'Este post es para probar la visualización de detalles';

  before(() => {
    cy.login('admin', 'admin');

    // Crear posts para pruebas mediante API
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/posts',
      body: {
        title: uniqueTitle,
        content: uniqueContent,
        date: new Date().toISOString(),
      },
    });

    // Crear un segundo post para verificar filtrado
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

    // Navegar a la lista de posts
    cy.get(entityItemSelector).click();
    cy.contains('Post').click();

    // Verificar que la lista tiene al menos 2 posts
    cy.get('tbody tr').should('have.length.at.least', 2);

    // Verificar que nuestro post está en la lista
    cy.contains(uniqueTitle).should('be.visible');

    // Ver detalles del post
    cy.contains('tr', uniqueTitle).find('[data-cy="entityDetailsButton"]').click();

    // CORRECCIÓN: Usar el selector correcto para los detalles del post
    // Intenta diferentes selectores ya que JHipster puede variar
    cy.contains('dl.jh-entity-details dd', uniqueTitle).should('be.visible');
    // Alternativamente:
    cy.get('dl.jh-entity-details').within(() => {
      cy.contains(uniqueTitle).should('be.visible');
      cy.contains(uniqueContent).should('be.visible');
    });

    // Volver a la lista
    cy.get('[data-cy="entityDetailsBackButton"]').click();
  });

  after(() => {
    // Limpiar: eliminar los posts creados
    cy.login('admin', 'admin');
    cy.authenticatedRequest({
      method: 'GET',
      url: '/api/posts',
    }).then(response => {
      // Añadir el tipo explícito al callback y al array
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
