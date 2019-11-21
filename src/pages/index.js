import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const ignite = get(this, 'props.data.contentfulProfileHeader')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <h2>{ignite.name}</h2>
          <h3>{ignite.specialism}</h3>
          <h4>Geo-location: {ignite.myLocation.lon}, {ignite.myLocation.lat}</h4>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
query HomeQuery {
  contentfulProfileHeader {
    name
    myLocation {
      lat
      lon
    }
    locationName
    id
    specialism
  }
  site {
    siteMetadata {
      title
    }
  }
  allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
    edges {
      node {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
           ...GatsbyContentfulFluid_tracedSVG
          }
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
  allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
    edges {
      node {
        name
        shortBio {
          shortBio
        }
        title
        
      }
    }
  }
}`
