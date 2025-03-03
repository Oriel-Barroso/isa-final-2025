import { entityItemSelector } from '../../support/commands';

describe('Editar Post', () => {
  const initialTitle = `Post para editar ${Date.now()}`;
  const updatedTitle = `Post editado ${Date.now()}`;

  before(() => {
    cy.login('admin', 'admin');

    // Crear post a través de la API para ahorrar tiempo
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

    // Navegar a la lista de posts
    cy.get(entityItemSelector).click();
    cy.contains('Post').click();

    // Buscar el post creado y hacer clic en editar
    cy.contains('tr', initialTitle).find('[data-cy="entityEditButton"]').click();

    // Editar el título
    cy.get('#field_title').clear().type(updatedTitle);

    // Guardar cambios
    cy.get('[data-cy="entityCreateSaveButton"]').click();

    // Verificar que se actualizó correctamente
    cy.contains('A Post is updated with identifier').should('be.visible');
    cy.contains(updatedTitle).should('be.visible');
  });

  after(() => {
    // Limpiar: eliminar el post editado mediante API
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
