import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.nav`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 26px;
`

const Paginator = styled.ul`
  display: flex;
  height: 30px;
  list-style-type: none;
  margin: 10px 0 0 0;
  padding: 0;
  overflow: hidden;
  border-left: 1px solid #dddddd;
  padding-right: 18px;
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
  font-family: 'Poppins', sans-serif;
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
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: white;
  background-color: #02bd94;
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
  color: #676a6c;

  &:hover {
    text-decoration: none;
    z-index: 2;
    color: #23527c;
    background-color: #eeeeee;
    border-color: #ddd;
    width: 100%;
    text-align: center;
  }
`
const PaginationText = styled.div`
  margin: 10px 0 0 0;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #676a6c;
  margin-right: 10px;
  span {
    margin-left: 3px;
  }
`

const PaginationTable = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage
}) => {
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
  console.log('pages', pages)

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

PaginationTable.propTypes = {
  postsPerPage: propTypes.any,
  totalPosts: propTypes.any,
  paginate: propTypes.any,
  currentPage: propTypes.any
}

export default PaginationTable
