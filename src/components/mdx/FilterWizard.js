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
`

const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
`

const FilterWizard = (props) => {
  return (
    // <Wrapper>
      <Container>
        <ContainerInner>
          <SwiperWizard />
        </ContainerInner>
      </Container>
    // </Wrapper>
  )
}

export default FilterWizard
