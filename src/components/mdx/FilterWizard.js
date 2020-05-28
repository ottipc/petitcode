import React, { useState } from 'react'
import styled from 'styled-components'
import SwiperWizard from '../Swiper/SwiperWizard'

const Wrapper = styled.div`
  padding: 35px;
  padding-left: 60px;
  padding-right: 60px;
  background-color: rgba(221, 221, 221, 0.4);
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    justify-content: end;
    padding-top: 50%;
  }
`

const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 30%;
`

const FilterWizard = (props) => {
  const {page} = props;
  return (
    // <Wrapper>
      <Container>
        <ContainerInner>
          <SwiperWizard page={page} />
        </ContainerInner>
      </Container>
    // </Wrapper>
  )
}

export default FilterWizard
