import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import FilterWizard from './mdx/FilterWizard'
import { navigate } from 'gatsby'
import * as typeformEmbed from '@typeform/embed'
import { getUserLangKey } from 'ptz-i18n'
import { GlobalContext } from '../utils/Contexts'

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
`
const MessageContent = styled.p`
  font-size: calc(26px + 6 * ((100vw - 320px) / 1600));
  line-height: 42px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Noto Sans,Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif;
  font-weight: bold;

  @media (max-width: 1167px) {
    flex-direction: column;
    text-align: center;
  }
`

const ModalContent = styled.p`
  font-size: 28px;
  line-height: 42px;
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5%;

  @media (max-width: 1167px) {
    overflow: hidden;
    width: 100%;
  }
`

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
`

const ModalForm = styled.div`
  font-size: 28px;
  line-height: 42px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  & > div {
    width: 100%;
  }
`

const ActionButton = styled.button`
  font-size: calc(26px + 6 * ((100vw - 320px) / 1600));
  line-height: 42px;
  font-weight: bold;
  border-radius: 0px;
  color: white;

  &:hover {
    background-color: white;
    color: black;
    border-radius: 0px;
  }

  &:focus {
    background-color: white;
    color: black;
    border-radius: 0px;
  }
`
const Divider = styled.span`
  font-size: calc(26px + 6 * ((100vw - 320px) / 1600));
  line-height: 42px;
  font-weight: bold;

  @media (max-width: 1167px) {
    display: none;
  }
`

const ConfirmButton = styled.button`
    background: white;
    color: black;
    font-family: Noto Sans,Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif;
    text-transform: uppercase;
    padding: 14px 20px;
    line-height: 20px;
    -webkit-text-decoration: none;
    text-decoration: none;
    box-shadow: 5px 5px 0px 0px rgba(255,255,255,0.22);
    margin-bottom: 5px;
    margin-top: 20px;
    font-size: 20px;

    @media (max-width: 767px) {
      margin-top: 0px;
      margin-bottom: 35px !important;
    }

    &:hover {
      text-decoration: underline;
    }
`

const Placeholder = styled.div`
  background-color: black;
  height: 40px;
  width: 100px;
  margin-top: 10px;
`

const Configurator = () => {
  const { activeLocale } = useContext(GlobalContext)
  console.log('loc', activeLocale);
  const [selection, setSelection] = useState(null)
  const [content, setContent] = useState(
    <ModalContainer className='configuratorContainer'>
      <MessageContent>I'm looking for a</MessageContent>
      <MessageContent>
        <ActionButton onClick={() => selectConfigurator('consultant')}>
          Digital Consultant
        </ActionButton>
        <Divider>/</Divider>
        <ActionButton onClick={() => selectConfigurator('team')}>
          Digital Agency
        </ActionButton>
        <Divider>/</Divider>
        <ActionButton onClick={() => selectConfigurator('freelancer')}>
          Freelancer
        </ActionButton>
        <Divider>/</Divider>
        <ActionButton onClick={() => selectConfigurator('FTE')}>
          Full-Time-Employee
        </ActionButton>{' '}
      </MessageContent>
      <MessageContent>for my</MessageContent>
      <MessageContent>Project / Company</MessageContent>
      {/* <Placeholder /> */}
    </ModalContainer>
  )

  const selectConfigurator = (value) => {
    setContent(
      <ModalContainer className='configuratorContainer'>
        <MessageContent>I'm looking for a</MessageContent>
        <MessageContent>
          <ActionButton onClick={() => selectConfigurator('consultant')}>
            Digital Consultant
          </ActionButton>
          <Divider>/</Divider>
          <ActionButton onClick={() => selectConfigurator('team')}>
            Digital Agency
          </ActionButton>
          <Divider>/</Divider>
          <ActionButton onClick={() => selectConfigurator('freelancer')}>
            Freelancer
          </ActionButton>
          <Divider>/</Divider>
          <ActionButton onClick={() => selectConfigurator('FTE')}>
            Full-Time-Employee
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
          <FormContainer>
            <ModalForm ref={(ref) => renderForm(ref)} />
            <ConfirmButton onClick={() => changeContent('back')}>
              Restart
            </ConfirmButton>
          </FormContainer>
        )
        break
      case 'consultant':
        navigate(`/${activeLocale}/company`)
      break
      case 'freelancer':
        typeof localStorage !== 'undefined' && localStorage.setItem('page', value);
        setContent(
          <ModalContainer className='configuratorContainer'>
            <ModalContent>
              <FilterWizard page={value} />
              <ConfirmButton onClick={() => changeContent('back')}>
                Restart
              </ConfirmButton>
            </ModalContent>
          </ModalContainer>
        )
        break
      case 'FTE':
        typeof localStorage !== 'undefined' && localStorage.setItem('page', value);
        setContent(
          <ModalContainer className='configuratorContainer'>
            <ModalContent>
              <FilterWizard page={value} />
              <ConfirmButton onClick={() => changeContent('back')}>
                Restart
              </ConfirmButton>
            </ModalContent>
          </ModalContainer>
        )
        break
      case 'back':
        setContent(
          <ModalContainer className='configuratorContainer'>
          <MessageContent>I'm looking for a</MessageContent>
          <MessageContent>
            <ActionButton onClick={() => selectConfigurator('team')}>
              Digital Consultant
            </ActionButton>
            <Divider>/</Divider>
            <ActionButton onClick={() => selectConfigurator('team')}>
              Digital Agency
            </ActionButton>
            <Divider>/</Divider>
            <ActionButton onClick={() => selectConfigurator('freelancer')}>
              Freelancer
            </ActionButton>
            <Divider>/</Divider>
            <ActionButton onClick={() => selectConfigurator('FTE')}>
              Full-Time-Employee
            </ActionButton>{' '}
          </MessageContent>
          <MessageContent>for my</MessageContent>
          <MessageContent>Project / Company</MessageContent>
          {/* <Placeholder /> */}
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
