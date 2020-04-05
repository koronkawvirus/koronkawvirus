/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import SEO from "../components/parts/seo"

import SideMenu from "../components/parts/sidemenu"

class Layout extends React.Component {

  render() {
    const { children, pageContext } = this.props;
    const mainColor = pageContext.pageName ? "bg-white" : "bg-lightpurple"
    return (
      <>
         <>
          <SEO path={this.props.location.href} post={{...pageContext}} />
          <div className="w-full mx-auto lg:flex h-full">
            <SideMenu />
            <div className={mainColor + " lg:w-3/4 lg:p-4 px-4"}>{children}</div>
          </div>
          </>
  
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
