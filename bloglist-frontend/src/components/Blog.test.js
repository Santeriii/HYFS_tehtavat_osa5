import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('after clicking the "view"-button of the blog the data of the likes and the url are shown', () => {
    const blog = {
        title: 'Testiblogi',
        author: 'Testaaja',
        url: 'testiblogi.com',
        likes: 2
    }

    const user = {
        username: 'peke'
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'Testiblogi'
    )

    expect(component.container).toHaveTextContent(
        'Testaaja'
    )

    expect(component.container).toHaveTextContent(
        'testiblogi.com'
    )
    
    expect(component.container).toHaveTextContent(
        2
    )
})

test('when clicked twice, the "like"-button triggers its" functionality twice', () => {
    const blog = {
        title: 'Testiblogi',
        author: 'Testaaja',
        url: 'testiblogi.com',
        likes: 2
    }

    const user = {
        username: 'peke'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} likeTest={mockHandler} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})