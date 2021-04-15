import React, { useState } from 'react'

const Blog = ({blog}) => {
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

  return (
    !fullData ? (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={handleFullData}>view</button>
      </div>
    )
    :
    (
      <div style={blogStyle}>
        {blog.title}<button onClick={handleFullData}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes}
        <button>like</button><br/>
        {blog.author}<br/>
      </div>
    )
  )
}

export default Blog