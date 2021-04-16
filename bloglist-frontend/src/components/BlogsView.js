import React from 'react'
import NotificationForm from './NotificationForm'
import ErrorForm from './ErrorForm'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

const BlogsView = ({
    notification,
    errorMessage,
    user,
    handleBlogSubmit,
    setTitle,
    setAuthor,
    setUrl,
    title,
    author,
    url,
    blogs
}) => {
    return (
      <>
        <h2>blogs</h2>
        {notification && <NotificationForm notification={notification} />}
        {errorMessage && <ErrorForm errorMessage={errorMessage} />}
        {user.name} logged in
        <button onClick={() => window.localStorage.removeItem('loggedBlogappUser')}>logout</button><br/>
        <Togglable buttonLabel="new blog">
            <BlogForm handleBlogSubmit={handleBlogSubmit} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} title={title} author={author} url={url} />
        </Togglable>
        <br/><br/>
        {blogs.sort(function(a, b) {
            return b.likes - a.likes
        }).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
      </>
    )
  }

export default BlogsView