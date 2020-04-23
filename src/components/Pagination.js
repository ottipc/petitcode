import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import propTypes from 'prop-types'

const Container = styled.nav`
  display: flex;
  justify-content: flex-end;
  font-family: 'Noto Sans', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial',
    sans-serif;
`

const Paginator = styled.ul`
  display: block;
  height: 30px;
  list-style-type: none;
  margin: 22px 25px 58px 0px;
  padding: 0;
  overflow: hidden;
  border-left: 1px solid #dddddd;
`
const Page = styled.li`
  float: left;
  width: 30px;
  height: 30px;
  border: 1px solid #dddddd;
  margin-left: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-size: 13px;
  color: #676a6c;
  background-color: white;
  &:first-child {
    border-top-left-radius: 4px;

    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`
const SelectedPage = styled.li`
  float: left;
  width: 30px;
  height: 30px;
  border: 1px solid #dddddd;
  margin-left: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-size: 13px;
  color: white;
  background-color: #000000;
  font-size: 1rem;
  line-height: 1.75rem;
  a {
    color: #fff;
    width: 100%;
    text-align: center;
    background: none !important;
    &:hover {
      color: #fff;
      background: none !important;
    }
  }
`

const PageNumber = styled.a`
  cursor: default;
  font-size: 1rem;
  line-height: 1.75rem;
  color: hsla(0, 0%, 0%, 0.8);
  &:hover {
    text-decoration: none;
    z-index: 2;
    color: hsla(0, 0%, 0%, 0.8);
    background-color: #eeeeee;
    border-color: #ddd;
    width: 100%;
    text-align: center;
  }
`
const PaginationText = styled.div`
  margin: 22px 10px 58px 0px;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-size: 0.95rem;
  line-height: 1.75rem;
  color: hsla(0, 0%, 0%, 0.8);
  span {
    margin-left: 3px;
  }
`

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = []
  let pages = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  pages = pageNumbers.map((number) => {
    if (currentPage === number) {
      return (
        <SelectedPage key={number} className="page-item">
          <PageNumber onClick={() => paginate(number)} className="page-link">
            {number}
          </PageNumber>
        </SelectedPage>
      )
    }
    return (
      <Page key={number} className="page-item">
        <PageNumber onClick={() => paginate(number)} className="page-link">
          {number}
        </PageNumber>
      </Page>
    )
  })

  return (
    <Container>
      <PaginationText>
        <b>{totalPosts}</b>
        <span>Results</span>
      </PaginationText>
      <Paginator>{pages}</Paginator>
    </Container>
  )
}

Pagination.propTypes = {
  postsPerPage: propTypes.any,
  totalPosts: propTypes.any,
  paginate: propTypes.any,
  currentPage: propTypes.any
}

export default Pagination
