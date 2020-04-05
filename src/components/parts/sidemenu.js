import React from "react"

import Categories from "../categories"
import Social from "../social"
import { useSiteMetadata } from "../../hooks/use-site-metadata"
import { Link } from "gatsby"

class SideClassMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isExpanded: false }

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState((state) => ({
      isExpanded: !state.isExpanded,
    }))
  }

  render() {
      const cssClasses = [this.state.isExpanded ? "" : "hidden lg:block"]
      return (
          <>
        <div className="lg:w-1/4 p-4 bg-lightpurple lg:h-screen">
          <div className="flex flex-col px-6">
            <div className="flex">
                <div className="w-4/5">
                <Link to="/">
                    <img alt={this.props.site.siteMetadata.title} className="mb-0 lg:h-auto h-24" src={this.props.logo.publicURL} />
                </Link>
                </div>
                <div className="block w-1/5 lg:hidden">
                <button
                    onClick={this.handleClick}
                    className="flex float-right 
                        items-center px-3 py-2 border rounded
                        text-gray-600 border-black"
                    >
                    <svg
                    className="fill-current h-6 w-6"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
                </div>

            </div>
            <div className="text-center text-gray-700 italic text-s">
              {this.props.site.siteMetadata.description}
            </div>
            <hr className="my-2 border-gray-600" />
            <div className="text-gray-700 italic text-s my-4">
              Koronką w wirusa!
            </div>
            
            <div className={cssClasses.join(" ")}>
              <div className="mt-2 p-4">
                <Categories />
              </div>
              <div className="p-4">
                <Social />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const SideMenu = () => {
    const { logo, site } = useSiteMetadata()
    return <SideClassMenu logo={logo} site={site} />
}

export default SideMenu
