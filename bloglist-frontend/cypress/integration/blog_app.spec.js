describe('Blog app', function() {
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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testi', password: 'testi'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

      cy.contains('Testi logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('testi')
      cy.get('#password').type('vaara')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testi', password: 'testi'
      })

      cy.visit('http://localhost:3000')

      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('A new blog')
      cy.get('#author').type('Test User')
      cy.get('#url').type('testblog.com')
      cy.get('#create').click()
    })

    it('A blog can be created', function() {
      cy.contains('A new blog')
      cy.contains('Test User')
    })

    it('A blog can be liked', function() {
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.visit('http://localhost:3000')
      cy.get('#view-button').click()
      cy.contains('A new blog').parent().contains(1)
    })

    it('A blog can be deleted', function() {
      cy.get('#logout').click()
      cy.visit('http://localhost:3000')
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.on('window:confirm', () => true)
      cy.visit('http://localhost:3000')
      cy.get('html').should('not.contain', 'A new blog')
    })

    it('The blogs are shown in a descending order sorted by the like count', function() {
      cy.get('#title').type('A second new blog')
      cy.get('#author').type('Test User')
      cy.get('#url').type('testblog.com')
      cy.get('#create').click()

      cy.get('#title').type('A third new blog')
      cy.get('#author').type('Test User')
      cy.get('#url').type('testblog.com')
      cy.get('#create').click()
      cy.visit('http://localhost:3000')

      cy.contains('A second new blog').contains('view').click()
      cy.contains('A second new blog').contains('like').click()
      cy.visit('http://localhost:3000')

      cy.contains('A second new blog').contains('view').click()
      cy.contains('A second new blog').contains('like').click()
      cy.visit('http://localhost:3000')

      cy.contains('A third new blog').contains('view').click()
      cy.contains('A third new blog').contains('like').click()
      cy.visit('http://localhost:3000')

      cy.get('#view-button').parent().contains('A second new blog')
    })
  })
})