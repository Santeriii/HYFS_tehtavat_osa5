import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeTest }) => {
  const [fullData, setFullData] = useState(false)

  const handleFullData = () => {
    setFullData(!fullData)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    likeTest()

    try {
      const likedBlog = {
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        id: blog.id
      }

      blogService.update(likedBlog)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      try {
        blogService.remove(blog.id)
      } catch (exception) {
        console.log(exception)
      }
  }

  return (
    !fullData ? (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button
          onClick={handleFullData}
          id='view-button'
        >view</button>
      </div>
    )
      :
      (
        <div style={blogStyle}>
          {blog.title}<button onClick={handleFullData}>hide</button><br/>
          {blog.url}<br/>
        likes {blog.likes}
          <button
            onClick={like}
            id='like-button'
          >like</button><br/>
          {blog.author}<br/>
          {blog.user &&
            blog.user.username === user.username &&
              <button onClick={handleRemove}>remove</button>
          }
        </div>
      )
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog