import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import styled from 'styled-components'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import { GlobalContext } from '../../utils/Contexts'
import { useTranslation } from 'react-i18next'
import Link from './Link'

const JobPostingsWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings.s4};
`
const TableFree = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s8};
`
const TableFte = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s8};
`

export default function JobListing() {
  const { t } = useTranslation()
  const { activeLocale } = useContext(GlobalContext)
  const queryResult = useStaticQuery(graphql`
    query jobPostings {
      fte: allContentfulJobPosting(filter: { type: { eq: "FTE" } }) {
        edges {
          node {
            contentful_id
            node_locale
            industry
            duration
            date(formatString: "MMM. 'YY")
            location
            pricePerYear
            type
            title
            referredBy
            commission
          }
        }
      }
      free: allContentfulJobPosting(filter: { type: { eq: "FREE" } }) {
        edges {
          node {
            contentful_id
            node_locale
            industry
            duration
            date(formatString: "MMM. 'YY")
            location
            type
            title
            referredBy
            pricePerHour
          }
        }
      }
    }
  `)
  let freeTable = null
  if (queryResult.free.edges) {
    const free = queryResult.free.edges
      .filter(({ node: { node_locale: locale } }) => locale === activeLocale)
      .map(({ node }) => node)
    freeTable = (
      <TableFree>
        <h2>{t('Open freelance positions')}</h2>
        <Table>
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Industry</Th>
              <Th>Date + Duration</Th>
              <Th>Location</Th>
              <Th>Price per hour</Th>
              <Th>Referred by</Th>
            </Tr>
          </Thead>
          <Tbody>
            {free.map(
              ({
                contentful_id: cid,
                title,
                industry,
                date,
                duration,
                location,
                pricePerHour,
                referredBy
              }) => (
                <Tr key={cid}>
                  <Td>
                    <Link contentfulId={cid}>{title}</Link>
                  </Td>
                  <Td>{industry}</Td>
                  <Td>
                    {date} for {duration}
                  </Td>
                  <Td>{location}</Td>
                  <Td>{pricePerHour}</Td>
                  <Td>{referredBy}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableFree>
    )
  }

  let fteTable = null
  if (queryResult.fte.edges) {
    const fte = queryResult.fte.edges
      .filter(({ node: { node_locale: locale } }) => locale === activeLocale)
      .map(({ node }) => node)
    fteTable = (
      <TableFte>
        <h2>{t('Open full time positions')}</h2>
        <Table>
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Industry</Th>
              <Th>Start date</Th>
              <Th>Location</Th>
              <Th>Price per year</Th>
              <Th>Commission</Th>
              <Th>Referred by</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fte.map(
              ({
                contentful_id: cid,
                title,
                industry,
                date,
                location,
                pricePerYear,
                commission,
                referredBy
              }) => (
                <Tr key={cid}>
                  <Td>
                    <Link contentfulId={cid}>{title}</Link>
                  </Td>
                  <Td>{industry}</Td>
                  <Td>{date}</Td>
                  <Td>{location}</Td>
                  <Td>{pricePerYear}</Td>
                  <Td>{commission}</Td>
                  <Td>{referredBy}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableFte>
    )
  }

  return (
    <JobPostingsWrapper>
      {freeTable}
      {fteTable}
    </JobPostingsWrapper>
  )
}
