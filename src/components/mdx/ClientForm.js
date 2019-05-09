import React, { useContext } from 'react'

import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
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

const Error = styled.div`
  opacity: 0.8;
  font-size: 0.8em;
`

export default function ClientForm() {
  const {
    location: { pathname }
  } = useContext(LocationContext)
  const onSubmit = () => {
    console.log('thanks')
  }
  return (
    <Wrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form
            onSubmit={handleSubmit}
            data-netlify="true"
            name="client-form"
            action={`${pathname}success`}
          >
            <Field
              name="name"
              tooShort="Your full name would be great"
              valueMissing="Tell us who u are"
            >
              {({ input, meta }) => (
                <>
                  <Input
                    {...input}
                    type="text"
                    placeholder="Name"
                    required
                    minLength={3}
                  />
                  <Error>
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </Error>
                </>
              )}
            </Field>
            <Separator />
            <Field
              name="email"
              valueMissing="Tell us your email so we can contact you"
              patternMismatch="Make sure your email is valid"
            >
              {({ input, meta }) => (
                <>
                  <Input
                    {...input}
                    type="text"
                    placeholder="Email"
                    required
                    minLength={3}
                    pattern=".+@.+"
                  />
                  <Error>
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </Error>
                </>
              )}
            </Field>
            <Separator />
            <Field
              name="message"
              tooShort="Tell us a little bit more"
              valueMissing="What do you want to tell us?"
            >
              {({ input, meta }) => (
                <>
                  <TextArea
                    {...input}
                    type="text"
                    placeholder="Message"
                    required
                    minLength={10}
                  />
                  <Error>
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </Error>
                </>
              )}
            </Field>
            <Submit type="submit" disabled={pristine || invalid}>
              Submit
            </Submit>
          </form>
        )}
      />
    </Wrapper>
  )
}
