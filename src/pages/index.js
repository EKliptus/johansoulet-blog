import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Contact from '../components/Index/Contact'
import Services from '../components/Index/Services'
import Posts from '../components/Index/Posts'
import Values from '../components/Index/Values'
import Banner from '../components/Index/Banner'

export const pageQuery = graphql`
  query IndexPage($locale: String) {
    allMdx(
      filter: { frontmatter: { lang: { eq: $locale } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
    ) {
      nodes {
        id
        excerpt(pruneLength: 100)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "D MMMM YYYY", locale: $locale)
          title
          featuredImage {
            childImageSharp {
              fluid(maxHeight: 500, maxWidth: 883, fit: COVER, quality: 50) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          chapo
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  return (
    <Layout isLanding>
      <Banner />
      <Values />
      <Posts posts={data.allMdx.nodes} />
      <Services />
      <Contact />
    </Layout>
  )
}

export default IndexPage
