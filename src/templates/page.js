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
import FilterWizard from '../components/mdx/FilterWizard';
import * as typeformEmbed from '@typeform/embed'
import Layout from '../components/Layout'
import { LocationContext, ModalContext, NavigationContext } from '../utils/Contexts'
import Hamburger from '../components/Hamburger'

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
   position: absolute;
   right: 20px;
`
const ModalContent = styled.p`
  font-size: 28px;
  line-height: 42px;
  width: 100%;
  display: flex;
  justify-content: center;
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

    this.typeformContainer = null;
    const renderModalContent = 
      <ModalContainer>
        <ModalContent>I'm looking for</ModalContent>
        <ModalContent><ActionButton onClick={() => changeContent('team')}>Team</ActionButton> / <ActionButton onClick={() => changeContent('freelancer')}>Freelancer</ActionButton> / <ActionButton onClick={() => changeContent('FTE')}>FTE</ActionButton> </ModalContent>
        <ModalContent>for my</ModalContent>
        <ModalContent>Project / Company</ModalContent>
      </ModalContainer>

    const renderForm = ref => {
      if (ref) {
        typeformEmbed.makeWidget(ref, "https://seb432889.typeform.com/to/O8jf2l", {
          hideFooter: true,
          hideHeaders: true,
          opacity: 0
        });
      }
    }

    const changeContent = (value) => {
      switch(value) {
        case 'team':
          this.setState({modalContent: 
          <ModalContainer>
            <ModalContent ref={ref => renderForm(ref)}></ModalContent>
          </ModalContainer>});
          break;
        case 'freelancer':
          this.setState({modalContent: 
          <ModalContainer>
            <ModalContent><FilterWizard page={value}/></ModalContent>
          </ModalContainer>});
          break;
        case 'FTE':
          this.setState({modalContent: 
          <ModalContainer>
            <ModalContent><FilterWizard page={value}/></ModalContent>
          </ModalContainer>});
          break;
        default:
          break;
      }
    }

    this.handleShowModal = () => {
      if (typeof localStorage !== 'undefined' &&
      (localStorage.getItem('showModal') == null || localStorage.getItem('showModal') === true)) {
        if (this.state.fabRef) {
          this.state.fabRef.click();
        }
      }
      typeof localStorage !== 'undefined' && localStorage.setItem('showModal', false)
    }

    this.state = {
      showModal: false,
      modalContent: renderModalContent,
      handleShowModal: this.handleShowModal, 
      fabRef: null,   
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('wheel', this.handleScroll);
  };
  
  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
  };
  
  handleScroll(event) {
    if (this.state.fabRef && typeof localStorage !== 'undefined' && (localStorage.getItem('showOverlay') == null || localStorage.getItem('showOverlay') === 'true') && window.location.pathname.split('/')[2] === '') {
      this.state.fabRef.click();
      typeof localStorage !== 'undefined' && localStorage.setItem('showOverlay', 'false')
    }
  };

  render() {

    if (window.location.pathname.split('/')[2] === '') {
      typeof localStorage !== 'undefined' && localStorage.setItem('showOverlay', 'true');
    }

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

    const getRef = (ref) => {
      if (ref && this.state.fabRef !== ref ) {
        this.setState({fabRef: ref});
      }
    }

    const renderForm = ref => {
      if (ref) {
        typeformEmbed.makeWidget(ref, "https://seb432889.typeform.com/to/O8jf2l", {
          hideFooter: true,
          hideHeaders: true,
          opacity: 0
        });
      }
    }

    const changeContent = (value) => {
      switch(value) {
        case 'team':
          this.setState({modalContent: 
          <ModalContainer>
            <ModalContent ref={ref => renderForm(ref)}></ModalContent>
          </ModalContainer>});
          break;
        case 'freelancer':
          this.setState({modalContent: 
          <ModalContainer>
            <ModalContent><FilterWizard page={value}/></ModalContent>
          </ModalContainer>});
          break;
        case 'FTE':
          this.setState({modalContent: 
          <ModalContainer>
            <ModalContent><FilterWizard page={value}/></ModalContent>
          </ModalContainer>});
          break;
        default:
          break;
      }
    }

    return (
      <ModalContext.Provider value={this.state}>
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
              },
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
          <FloatingActionButton getRef={getRef} onClick={switchModal}><Hamburger /></FloatingActionButton>
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
      </ModalContext.Provider>
    )
  }
}

PageTemplate.contextType = NavigationContext;

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
