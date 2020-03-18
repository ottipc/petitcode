import React from 'react'
import styled from 'styled-components'

const Container = styled.nav`
  display: flex;
  justify-content: flex-end;
`

const Paginator = styled.ul`
  ${'' /* display: flex; */}
  display: block;
  height: 30px;
  list-style-type: none;
  margin: 40px 25px 40px 0px;
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
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #676a6c;
  background-color: white;
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
`

const PageNumber = styled.a`
  cursor: default;
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
      <Paginator>{pages}</Paginator>
    </Container>
  )
}

export default Pagination
