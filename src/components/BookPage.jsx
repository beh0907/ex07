import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Button, Form, FormControl } from 'react-bootstrap'

const BookPage = () => {
    const bookRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([])
    const [query, setQuery] = useState('리액트')
    const [page, setPage] = useState(1)
    const [end, setEnd] = useState(false)
    const [total, setTotal] = useState(0);

    const getBooks = async () => {
        const url = "https://dapi.kakao.com/v3/search/book?target=title";
        const config = {
            headers: { "Authorization": 'KakaoAK 7d083064dcb5ec4a4a7ddbbf9b1025c5' },
            params: { "query": query, "size": 6, "page": page }
        }

        setLoading(true)
        const result = await axios.get(url, config)
        console.log(result)

        setTotal(result.data.meta.pageable_count)
        setEnd(result.data.meta.is_end)
        setBooks(result.data.documents);
        setLoading(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setPage(1)
        getBooks()
        
        bookRef.current.focus()
    }

    useEffect(() => {
        getBooks();
    }, [page]);

    if (loading) return <h1 className='text-center my-5'>로딩중......</h1>
    return (
        <Row className='my-5 mx-2'>
            <Col xs={6} md={2}>
                <Form onSubmit={onSubmit}>
                    <FormControl value={query} onChange={(e) => setQuery(e.target.value)} placeholder='검색어' ref={bookRef} />
                </Form>

                <div className='my-3'>검색 수 : {total} 건</div>
            </Col>
            <hr />
            <Col>
                <h1 className='text-center'>도서검색</h1>
                <Row>
                    {books.map(book =>
                        <Col key={book.isbn} className='box m-2'>
                            <img src={book.thumbnail ? book.thumbnail : 'http://via.placeholder.com/170x150'} />
                            <div className='ellipsis'>{book.title}</div>
                            <div className='ellipsis'>{book.price} 원</div>
                        </Col>

                    )}
                </Row>

                <div className='text-center my-3'>
                    <Button onClick={() => setPage(page - 1)} disabled={page === 1}>이전</Button>
                    <span className='mx-3'>{page}</span>
                    <Button onClick={() => setPage(page + 1)} disabled={end}>다음</Button>
                </div>


            </Col>
        </Row>
    )
}

export default BookPage