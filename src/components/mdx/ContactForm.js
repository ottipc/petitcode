import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`
const Radio = styled.input``
const RadioLabel = styled.label`
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
  padding-left: 1rem;
`
const Input = styled.input`
  display: block;
  width: 100%;
  color: #767676;
  font-size: 20px;
  background: transparent;
  border: none;

  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-input-placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: #767676;
  }
`

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  color: #767676;
  font-size: 20px;
  background: transparent;
  border: none;

  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-input-placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: #767676;
  }
`

const Separator = styled.div`
  background: rgba(216, 216, 216, 0.3);
  height: 1px;
  width: 100%;
  margin: 1rem 0;
`

const Submit = styled.input`
  color: #767676;
  text-transform: uppercase;
  background: transparent;
  border: none;
  cursor: pointer;
`

export default function ContactForm() {
  return (
    <form netlify>
      <Grid>
        <RadioGroup>
          <Radio
            type="radio"
            name="contact-reason"
            id="contact-reason-contact"
            value="contact"
            checked
          />
          <RadioLabel for="contact-reason-contact">Contact</RadioLabel>
        </RadioGroup>
        <RadioGroup>
          <Radio
            type="radio"
            name="contact-reason"
            id="contact-reason-recruitment"
            value="recruitment"
          />
          <RadioLabel for="contact-reason-recruitment">Recruitment</RadioLabel>
        </RadioGroup>
      </Grid>
      <Input name="name" placeholder="NAME" required />
      <Separator />
      <Input type="email" name="email" placeholder="EMAIL" required />
      <Separator />
      <TextArea name="message" placeholder="ENTER MESSAGE" required />
      <Submit type="submit" value="Send message" />
    </form>
  )
}
