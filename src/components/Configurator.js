import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import FilterWizard from './mdx/FilterWizard'
import * as typeformEmbed from '@typeform/embed'

const ModalContainer = styled.div`
  width: 100vh;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const ModalContent = styled.p`
  font-size: 28px;
  line-height: 42px;
  width: 100%;
  display: flex;
  justify-content: center;
`
const ActionButton = styled.button`
  font-size: 28px;
  line-height: 42px;
  font-weight: bold;

  &:focus {
    background-color: white;
    color: black;
  }
`
const ConfirmButton = styled.button`
  font-family: Noto Sans, Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  background-color: white;
  color: black;
  height: 40px;
  width: 100px;
  margin-top: 10px;
  border-radius: 5px;
`
const Placeholder = styled.div`
  background-color: black;
  height: 40px;
  width: 100px;
  margin-top: 10px;
`

const Configurator = () => {
  const [selection, setSelection] = useState(null)
  const [content, setContent] = useState(
    <ModalContainer>
      <ModalContent>I'm looking for</ModalContent>
      <ModalContent>
        <ActionButton onClick={() => selectConfigurator('team')}>
          Team
        </ActionButton>{' '}
        /{' '}
        <ActionButton onClick={() => selectConfigurator('freelancer')}>
          Freelancer
        </ActionButton>{' '}
        /{' '}
        <ActionButton onClick={() => selectConfigurator('FTE')}>
          FTE
        </ActionButton>{' '}
      </ModalContent>
      <ModalContent>for my</ModalContent>
      <ModalContent>Project / Company</ModalContent>
      <Placeholder />
    </ModalContainer>
  )

  const selectConfigurator = (value) => {
    setContent(
      <ModalContainer>
        <ModalContent>I'm looking for</ModalContent>
        <ModalContent>
          <ActionButton onClick={() => selectConfigurator('team')}>
            Team
          </ActionButton>{' '}
          /{' '}
          <ActionButton onClick={() => selectConfigurator('freelancer')}>
            Freelancer
          </ActionButton>{' '}
          /{' '}
          <ActionButton onClick={() => selectConfigurator('FTE')}>
            FTE
          </ActionButton>{' '}
        </ModalContent>
        <ModalContent>for my</ModalContent>
        <ModalContent>Project / Company</ModalContent>
        <ConfirmButton onClick={() => changeContent(value)}>
          Confirm
        </ConfirmButton>
      </ModalContainer>
    )
    setSelection(value)
  }

  const renderForm = (ref) => {
    if (ref) {
      typeformEmbed.makeWidget(
        ref,
        'https://seb432889.typeform.com/to/O8jf2l',
        {
          hideFooter: true,
          hideHeaders: true,
          opacity: 0
        }
      )
    }
  }

  const changeContent = (value) => {
    switch (value) {
      case 'team':
        setContent(
          <ModalContainer>
            <ModalContent ref={(ref) => renderForm(ref)} />
          </ModalContainer>
        )
        break
      case 'freelancer':
        setContent(
          <ModalContainer>
            <ModalContent>
              <FilterWizard page={value} />
            </ModalContent>
          </ModalContainer>
        )
        break
      case 'FTE':
        setContent(
          <ModalContainer>
            <ModalContent>
              <FilterWizard page={value} />
            </ModalContent>
          </ModalContainer>
        )
        break
      default:
        break
    }
  }

  return <>{content}</>
}

Configurator.propTypes = {
  children: propTypes.any
}

export default Configurator
