import React, { useState } from 'react'
import styled from 'styled-components'
import SwiperWizard from '../Swiper/SwiperWizard'

const Wrapper = styled.div`
  padding: 25px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 15px 20px 20px 20px;
  height: 200px;
  justify-content: center;
  align-items: center;
`

const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 85%;
  height: 150px;
`

const FilterWizard = (props) => {
  return (
    <Wrapper>
      <Container>
        <ContainerInner>
          <SwiperWizard />
        </ContainerInner>
      </Container>
    </Wrapper>
  )
}

export default FilterWizard
