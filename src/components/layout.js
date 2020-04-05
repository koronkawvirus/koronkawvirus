/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import SEO from "../components/parts/seo"

import Sidebar from "./sidebar"

const Layout = ({ children, mainColor, title }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
       <>
        <SEO title={title} />
        <div className="w-full mx-auto flex h-full">
          <Sidebar />
          <div className={mainColor + " w-3/4 p-4"}>{children}</div>
        </div>
        </>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
