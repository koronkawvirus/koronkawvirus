/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ path, post }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            sitelogo
          }
        }
      }
    `
  )
  const lang = `pl`


  const regex = /(<([^>]+)>)/ig;
  const metaDescription = (post.description && 
    post.description.replace(regex, '').replace("&nbsp;", '').replace("[&hellip;]", "..."))
    || site.siteMetadata.description
  const titleTemplate = post.pageName ? `%s | ${site.siteMetadata.title}` : `%s`
  const title = post.pageName || site.siteMetadata.title
  const type = post.pageType === 'post' ? 'article' : 'website'
  const image = post.image ? new URL(post.image, site.siteMetadata.siteUrl) : new URL(site.siteMetadata.sitelogo, site.siteMetadata.siteUrl);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: path
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: image
        },
        {
          property: `og:type`,
          content: type,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: image,
        },
      ]}
    />
  )
}

SEO.defaultProps = {
  lang: `pl`
}

export default SEO
