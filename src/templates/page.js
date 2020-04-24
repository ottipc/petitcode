import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import DefaultLayout from '../components/mdx/DefaultLayout'
import Freelancers from '../components/mdx/Freelancers'
import Modal from 'react-modal';

import Layout from '../components/Layout'
import { LocationContext } from '../utils/Contexts'

import components from '../components/mdx-components'
import FloatingActionButton from '../components/FloatingActionButton'

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    zIndex: '10000'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const ModalContainer = styled.div`
  width: 100vh;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const CloseButton = styled.button`
  float: right;
`
const ModalContent = styled.p`
  font-size: 28px;
  line-height: 42px;
`
const ActionButton = styled.button`
  font-size: 28px;
  line-height: 42px;
  font-weight: bold;
`

Modal.setAppElement('#___gatsby')

class PageTemplate extends React.PureComponent {

  
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }
  
  
  constructor () {
    super();

    const renderModalContent = 
      <ModalContainer>
        <ModalContent>I'm looking for</ModalContent>
        <ModalContent><ActionButton onClick={() => changeContent('team')}>Team</ActionButton> / <ActionButton onClick={() => changeContent('freelancer')}>Freelancer</ActionButton> / <ActionButton onClick={() => changeContent('FTE')}>FTE</ActionButton> </ModalContent>
        <ModalContent>for my</ModalContent>
        <ModalContent>Project / Company</ModalContent>
      </ModalContainer>

    const changeContent = (value) => {
      this.setState({modalContent: 
      <ModalContainer>
        <ModalContent>{value}</ModalContent>
      </ModalContainer>});
    }

    this.state = {
      showModal: false,
      modalContent: renderModalContent    
    };
  }

  render() {
    const renderModalContent = 
      <ModalContainer>
        <ModalContent>I'm looking for</ModalContent>
        <ModalContent><ActionButton onClick={() => changeContent('team')}>Team</ActionButton> / <ActionButton onClick={() => changeContent('freelancer')}>Freelancer</ActionButton> / <ActionButton onClick={() => changeContent('FTE')}>FTE</ActionButton> </ModalContent>
        <ModalContent>for my</ModalContent>
        <ModalContent>Project / Company</ModalContent>
      </ModalContainer>
    const { location, data } = this.props
    const {
      title,
      description,
      contentful_id: contentfulId,
      node_locale: locale,
      content: {
        childMdx: { body }
      }
    } = data.contentfulPage
    let activeFilters = []
    let csvData = []

    if (typeof location !== 'undefined' && location != null) {
      activeFilters =
        location.state !== 'undefined' && location.state != null
          ? location.state.activeFilters
          : []
      csvData =
        location.state !== 'undefined' && location.state != null
          ? location.state.csvData
          : []
    }

    const switchModal = () => {
      this.setState({showModal: !this.state.showModal})
      if (this.state.showModal) {
        this.setState({modalContent: renderModalContent});
      }
    }

    const changeContent = (value) => {
      this.setState({modalContent: 
      <ModalContainer>
        <ModalContent>{value}</ModalContent>
      </ModalContainer>});
    }

    return (
      // <ClientContext.Provider value={client}>
      <LocationContext.Provider
        value={{
          activeContentfulId: contentfulId,
          activeLocale: locale,
          location
        }}
      >
        <Layout>
        <Modal isOpen={this.state.showModal} style={customStyles}>
          <CloseButton onClick={() => switchModal()}>close</CloseButton>
          {this.state.modalContent}
        </Modal>
          <Helmet
            /**
             * Meta information based on:
             * https://moz.com/blog/meta-data-templates-123
             * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
             */
            title={title}
            meta={[
              {
                property: 'og:title',
                content: title
              },
              {
                name: 'description',
                content: description
              },
              {
                property: 'og:description',
                content: description
              }
              // heroImage && {
              //   property: 'twitter:image:src',
              //   content: `${seoImage.file.url}?w=1200&h=628&fit=fill`
              // },
              // heroImage && {
              //   property: 'og:image',
              //   content: `${seoImage.file.url}?w=1200&h=630&fit=fill`
              // }
            ].filter(Boolean)}
          />
          <FloatingActionButton onClick={switchModal}>FAB</FloatingActionButton>
          {location.pathname.indexOf('specialists') < 0 && (
            <MDXProvider components={components}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
          )}
          {location.pathname.indexOf('specialists') >= 0 && (
            <DefaultLayout>
              <Freelancers activeFilters={activeFilters} csvData={csvData} />
            </DefaultLayout>
          )}
        </Layout>
      </LocationContext.Provider>
      // </ClientContext.Provider>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      contentful_id
      title
      slug
      description
      content {
        childMdx {
          body
        }
      }
    }
  }
`
