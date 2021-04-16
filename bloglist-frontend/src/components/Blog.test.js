import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('initially renders thet title and the author of the blog, but not the likes nor the url', () => {
    const blog = {
        title: 'Testiblogi',
        author: 'Testaaja',
        url: 'testiblogi.com',
        likes: 2
    }

    const user = {
        username: 'testaaja'
    }

    const component = render(
        <Blog blog={blog} user={user}/>
    )

    expect(component.container).toHaveTextContent(
        'Testiblogi'
    )

    expect(component.container).toHaveTextContent(
        'Testaaja'
    )

    expect(component.container).not.toHaveTextContent(
        'testiblogi.com'
    )

    expect(component.container).not.toHaveTextContent(
        2
    )
})