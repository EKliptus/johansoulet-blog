import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Breadcrumb from '../components/Breadcrumb'
import PostList from '../components/PostList'

export const pageQuery = graphql`
  query BlogPage($locale: String) {
    allMdx(
      filter: { frontmatter: { lang: { eq: $locale } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
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

const BlogPostList = ({ data, pageContext }) => {
  return (
    <Layout fullMenu locale={pageContext.locale}>
      <section className="wrapper style5">
        <div className="inner">
          <Breadcrumb
            links={[{ label: 'breadcrumb.home', to: '/' }, { label: 'breadcrumb.blog' }]}
            withDivider={false}
          />
        </div>
        <PostList posts={data.allMdx.nodes}></PostList>
      </section>
    </Layout>
  )
}

export default BlogPostList
