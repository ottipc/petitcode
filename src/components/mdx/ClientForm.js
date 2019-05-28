import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import styled from 'styled-components'
import queryString from 'query-string'

import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { LocationContext } from '../../utils/Contexts'
import FormGrid from '../forms/FormGrid'
import Label from '../forms/Label'
import InputField from '../forms/InputField'
import RadioGroup from '../forms/RadioGroup'

const Wrapper = styled.div``

export default function ClientForm({ children, scrollTo }) {
  const formName = 'client-form'
  const {
    location: { pathname, search }
  } = useContext(LocationContext)
  const parsed = queryString.parse(search)

  const intro = children.find((child) => child.props.mdxType === 'FormIntro')

  const success = children.find(
    (child) => child.props.mdxType === 'FormSuccess'
  )

  if (parsed.success === formName) {
    return <Wrapper>{success}</Wrapper>
  }

  return (
    <Wrapper>
      {intro}
      <Form
        onSubmit={() => {}}
        render={() => (
          <form
            method="post"
            data-netlify="true"
            name={formName}
            action={`${pathname}?success=${formName}#${scrollTo}`}
          >
            <input type="hidden" name="form-name" value={formName} />
            <Field name="company" valueMissing="Tell us who u are">
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  label="Company name"
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
                  input={{ ...input, pattern: '^[^\\s]+@[^\\s]+$' }}
                  meta={meta}
                  type="text"
                  label="Email"
                  required
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
                      value="Join as a freelancer"
                      control={<Radio />}
                      label="Join as a freelancer"
                    />
                    <FormControlLabel
                      value="Get stuff done"
                      control={<Radio />}
                      label="Get stuff done"
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

ClientForm.propTypes = {
  children: propTypes.node.isRequired,
  scrollTo: propTypes.string.isRequired
}
