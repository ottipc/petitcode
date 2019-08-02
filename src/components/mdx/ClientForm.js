import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import styled from 'styled-components'
import queryString from 'query-string'

import Button from '@material-ui/core/Button'

import { LocationContext } from '../../utils/Contexts'
import InputField from '../forms/InputField'

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
            <Field
              name="name"
              tooShort="How should we call you?"
              valueMissing="Tell us who you are"
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
            <Field name="contact">
              {({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  label="Contact"
                />
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
