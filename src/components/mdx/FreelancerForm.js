import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import queryString from 'query-string'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/InputBase'

import theme from '../../utils/styling/theme'
import { LocationContext } from '../../utils/Contexts'
import FormGrid from '../forms/FormGrid'
import InputField from '../forms/InputField'
import Label from '../forms/Label'

const Wrapper = styled.div``
export const FormIntro = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s4};
`
export const FormSuccess = styled.div``

export default function FreelancerForm({ scrollTo, children }) {
  const formName = 'freelancer-form'
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
            <Field name="upload" valueMissing="Show us what you do">
              {({ input, meta }) => (
                <div style={{ marginBottom: theme.spacings.s2 }}>
                  <Label className={meta.error && 'Mui-error'}>
                    Upload your CV.pdf, awesomepic.jpg or references.md *
                  </Label>
                  <div>
                    <Input
                      input={input}
                      meta={meta}
                      type="file"
                      accept="image/*,.pdf,.md"
                      multiple
                      required
                    />
                  </div>
                </div>
              )}
            </Field>
            <Field
              name="additional-links"
              valueMissing="Give us some links to check out your work. Your website, LinkedIn, GitHub, dribbble, codepen..."
            >
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  label="Some links representing your work"
                  required
                  minLength={10}
                  multiple
                />
              )}
            </Field>
            <Button
              variant="contained"
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

FreelancerForm.propTypes = {
  children: propTypes.node.isRequired,
  scrollTo: propTypes.string.isRequired
}
