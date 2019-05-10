import React, { useContext } from 'react'

import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import { LocationContext } from '../../utils/Contexts'

import styled from 'styled-components'

// import FormGrid from '../forms/FormGrid'
import InputField from '../forms/InputField'
import TextAreaField from '../forms/TextAreaField'
import Submit from '../forms/Submit'
import Separator from '../forms/Separator'

const Wrapper = styled.div``

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
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  label="Name"
                  required
                  minLength={3}
                />
              )}
            </Field>
            <Separator />
            <Field
              name="email"
              valueMissing="Tell us your email so we can contact you"
              patternMismatch="Make sure your email is valid"
            >
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  label="Email"
                  required
                  pattern="[^\s]+@[^\s]+"
                />
              )}
            </Field>
            <Separator />
            <Field
              name="message"
              tooShort="Tell us a little bit more"
              valueMissing="What do you want to tell us?"
            >
              {({ input, meta }) => (
                <TextAreaField
                  input={input}
                  meta={meta}
                  type="text"
                  label="Message"
                  required
                  minLength={3}
                />
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
