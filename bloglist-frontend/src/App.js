import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(exception)
    }
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    try {
      const blog = {
        title: title,
        author: author,
        url: url
      }

      const createdBlog = await blogService.create(blog)
      setBlogs(blogs.concat(createdBlog))

      setNotification(`a new blog ${blog.title} by ${blog.author} added`)

      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage(`blog creation failed`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notificationForm = () => {
    return (
      <h1 style={{ color: 'green '}}>{notification}</h1>
    )
  }

  const errorForm = () => {
    return (
      <h1 style={{ color: 'red' }}>{errorMessage}</h1>
    )
  }

  const loginForm = () => {
    return (
      <>
        <h2>log in to application</h2>
          {errorMessage && errorForm()}
          <form onSubmit={handleLogin}>
            <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
          </form>
        </>
    )
  }

  const blogForm = () => {
    return (
      <form onSubmit={handleBlogSubmit}>
        <h2>create new</h2>
        <br/>
        <div>
          title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    )
  }

  const blogsView = () => {
    return (
      <>
        <h2>blogs</h2>
        {notification && notificationForm()}
        {errorMessage && errorForm()}
        {user.name} logged in
        <button onClick={() => window.localStorage.removeItem('loggedBlogappUser')}>logout</button><br/>
        {blogForm()}
        <br/><br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogsView()}
    </div>
  )
}

export default App