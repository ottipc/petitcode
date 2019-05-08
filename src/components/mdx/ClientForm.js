import React, { useContext } from 'react'

import { useForm, useField } from 'react-final-form-hooks'
import { LocationContext } from '../../utils/Contexts'

import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.black};
  max-width: 500px;
  padding: 0 ${({ theme }) => theme.spacings.s4};
`
const Input = styled.input`
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  background: transparent;
  border: none;

  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-input-placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grey500};
  }
`

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  background: transparent;
  border: none;

  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-input-placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grey500};
  }
`

const Separator = styled.div`
  background: rgba(216, 216, 216, 0.3);
  height: 1px;
  width: 100%;
  margin: 1rem 0;
`

const Submit = styled.button`
  display: block;
  margin-top: ${({ theme }) => theme.grid.gutter * 4}px;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.grey500};
      cursor: not-allowed;
    `}
`

export default function ClientForm() {
  const {
    location: { pathname }
  } = useContext(LocationContext)
  const onSubmit = () => {
    console.log('thanks')
  }
  const { form, handleSubmit, pristine, submitting } = useForm({
    onSubmit // the function to call with your form values upon valid submit
    // validate // a record-level validation function to check all form values
  })
  const name = useField('name', form, (val) =>
    val ? null : 'Please let us know your name'
  )
  const email = useField('email', form, (val) =>
    val ? null : 'Please let us know your email address'
  )
  const message = useField('message', form, (val) =>
    val ? null : 'Please let us know what u want to tell us'
  )
  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit}
        data-netlify="true"
        name="client-form"
        action={`${pathname}success`}
      >
        <Input {...name.input} placeholder="Name" />
        {name.meta.touched && name.meta.error && <span>{name.meta.error}</span>}
        <Separator />
        <Input {...email.input} placeholder="Email" />
        {email.meta.touched && email.meta.error && (
          <span>{email.meta.error}</span>
        )}
        <Separator />
        <TextArea {...message.input} placeholder="Message" />
        {message.meta.touched && message.meta.error && (
          <span>{message.meta.error}</span>
        )}
        <Submit type="submit" disabled={pristine || submitting}>
          Submit
        </Submit>
      </form>
    </Wrapper>
  )
}
