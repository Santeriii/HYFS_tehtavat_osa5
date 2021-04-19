import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleBlogSubmit
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()
    handleBlogSubmit({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={submitBlog}>
      <h2>create new</h2>
      <br/>
      <div>
          title:
        <input
          type="text"
          className='title'
          id='title'
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
          author:
        <input
          type="text"
          className='author'
          id='author'
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          url:
        <input
          type="text"
          className='url'
          id='url'
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id='create'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleBlogSubmit: PropTypes.func.isRequired
}

export default BlogForm