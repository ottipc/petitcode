import React, { useContext } from 'react'
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import styled from 'styled-components'

import { LocationContext } from '../../utils/Contexts'

import FormGrid from '../forms/FormGrid'
import Label from '../forms/Label'
import InputField from '../forms/InputField'
import RadioGroup from '../forms/RadioGroup'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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
            <Field name="company" valueMissing="Tell us who u are">
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  label="Company name"
                  required
                />
              )}
            </Field>
            <Field name="website">
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  label="Company website"
                />
              )}
            </Field>
            <Label>Contact person</Label>
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
            <Field name="telephone">
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  label="Telephone"
                />
              )}
            </Field>
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
            <Field
              name="type-of-enquiry"
              valueMissing="What is your reason to contact us?"
              type="radio"
            >
              {({ input, meta }) => (
                <RadioGroup
                  aria-label="Contact reason"
                  name="contact-reason"
                  input={input}
                  meta={meta}
                >
                  <Label>Contact reason</Label>
                  <FormGrid>
                    <FormControlLabel
                      value="source a freelancer"
                      control={<Radio />}
                      label="source a freelancer"
                    />
                    <FormControlLabel
                      value="develop a complete solution"
                      control={<Radio />}
                      label="develop a complete solution"
                    />
                  </FormGrid>
                </RadioGroup>
              )}
            </Field>
            <Field name="comment">
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  label="Additional comment"
                  multiline
                />
              )}
            </Field>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      />
    </Wrapper>
  )
}
