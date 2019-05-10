import React, { useContext } from 'react'

import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import { LocationContext } from '../../utils/Contexts'

import styled from 'styled-components'

import FormGrid from '../forms/FormGrid'
import InputField from '../forms/InputField'
import TextAreaField from '../forms/TextAreaField'
import Submit from '../forms/Submit'
import Separator from '../forms/Separator'

const Wrapper = styled.div``

export default function FreelancerForm() {
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
            name="freelancer-form"
            action={`${pathname}success`}
          >
            <FormGrid>
              <Field
                name="name"
                tooShort="Your first name would be great"
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
              <Field
                name="surname"
                tooShort="Your surname would be great"
                valueMissing="Tell us who u are"
              >
                {({ input, meta }) => (
                  <InputField
                    input={input}
                    meta={meta}
                    type="text"
                    label="Surname"
                    required
                    minLength={3}
                  />
                )}
              </Field>
            </FormGrid>
            <Separator />
            <Field name="occupation" valueMissing="Tell us what you do">
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  label="Occupation / Specialization"
                  required
                />
              )}
            </Field>
            <Separator />
            <Field name="upload" valueMissing="Show us what you do">
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="file"
                  label="Upload your CV.pdf, awesomepic.jpg or references.md"
                  accept="image/*,.pdf,.md"
                  multiple
                  required
                />
              )}
            </Field>
            <Separator />
            <Field
              name="additional-links"
              valueMissing="Give us some links to check out your work. Your website, LinkedIn, GitHub, dribbble, codepen..."
            >
              {({ input, meta }) => (
                <TextAreaField
                  input={input}
                  meta={meta}
                  label="Some links representing your work"
                  required
                  minLength={10}
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
