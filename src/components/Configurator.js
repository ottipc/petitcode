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
const MessageContent = styled.p`
  font-size: 28px;
  line-height: 42px;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: Noto Sans,Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif;
`

const ModalContent = styled.p`
  font-size: 28px;
  line-height: 42px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
const ModalForm = styled.p`
  font-size: 28px;
  line-height: 42px;
  width: 100%;
  height: 100%;
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
      <MessageContent>I'm looking for</MessageContent>
      <MessageContent>
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
      </MessageContent>
      <MessageContent>for my</MessageContent>
      <MessageContent>Project / Company</MessageContent>
      <Placeholder />
    </ModalContainer>
  )

  const selectConfigurator = (value) => {
    setContent(
      <ModalContainer>
        <MessageContent>I'm looking for</MessageContent>
        <MessageContent>
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
        </MessageContent>
        <MessageContent>for my</MessageContent>
        <MessageContent>Project / Company</MessageContent>
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
            <ModalForm ref={(ref) => renderForm(ref)} />
            <ConfirmButton onClick={() => changeContent('back')}>
              Back
            </ConfirmButton>
          </ModalContainer>
        )
        break
      case 'freelancer':
        typeof localStorage !== 'undefined' && localStorage.setItem('page', value)
        setContent(
          <ModalContainer>
            <ModalContent>
              <FilterWizard page={value} />
              <ConfirmButton onClick={() => changeContent('back')}>
                Back
              </ConfirmButton>
            </ModalContent>
          </ModalContainer>
        )
        break
      case 'FTE':
        typeof localStorage !== 'undefined' && localStorage.setItem('page', value)
        setContent(
          <ModalContainer>
            <ModalContent>
              <FilterWizard page={value} />
              <ConfirmButton onClick={() => changeContent('back')}>
                Back
              </ConfirmButton>
            </ModalContent>
          </ModalContainer>
        )
        break
      case 'back':
        setContent(
          <ModalContainer>
          <MessageContent>I'm looking for</MessageContent>
          <MessageContent>
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
          </MessageContent>
          <MessageContent>for my</MessageContent>
          <MessageContent>Project / Company</MessageContent>
          <Placeholder />
        </ModalContainer>
        )
        break;
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
