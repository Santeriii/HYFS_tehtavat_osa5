describe('Blog', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testi', name: 'Testi', password: 'testi'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe.only('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testi', password: 'testi'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

      cy.contains('Testi logged in')
    })

    it('fails with incorrect credetials', function () {
      cy.get('#username').type('testi')
      cy.get('#password').type('vaara')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
})