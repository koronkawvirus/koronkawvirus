import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import { navigate } from "@reach/router"
import Img from "gatsby-image"
import Youtube from "../components/youtube"
import ParseHtml from "../components/parsehtml"
import { AiFillFastBackward, AiFillFastForward } from "react-icons/ai";
import { TiArrowBackOutline } from "react-icons/ti";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import Emailshare from "../components/parts/emailshare"


class Post extends Component {
  render() {
    const post = this.props.data.wpPost
    const { previous, next, pageName } = this.props.pageContext
    const buttonClasses = "my-2 md:my-0 mx-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
    return (
      <>
      <div className="lg:flex block lg:flex-row-reverse">
          {post.featuredImage && (
          <div className="lg:w-1/3 w-full pt-4 lg:pt-0">
              <Img className="mx-auto lg:w-full w-3/4"
                fluid={post.featuredImage.remoteFile.childImageSharp.fluid}
              />
          </div>
          )}
          <div className="lg:w-2/3 w-full">
            <Header categories={post.categories} title={post.title} />
            <article
              className="p-4"
            >
              {ParseHtml(post.content)}
            </article>
            {post.film.youtube_video && (
              <Youtube>{post.film.youtube_video}</Youtube>
            )}
          </div>
          
      </div>
      <div className="flex p-2 items-center">
        <span className="font-bold mx-2">Udostępnij</span>
        <FacebookShareButton
            className="mx-2"
            url={this.props.location.href}
            quote={pageName}
          >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
            className="mx-2"
            url={this.props.location.href}
            quote={pageName}
          >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <Emailshare title={post.title} url={this.props.location.href} />
      </div>
      <div className="flex flex-col md:flex-row p-2">
      <button 
        className={buttonClasses}
        onClick={(e) => navigate(-1)}
      >
          <TiArrowBackOutline className="fill-current w-4 h-4 mr-2" />
          <span>Wróć</span>
        </button>
        {previous &&
        <Link className={buttonClasses} to={`/${previous.slug}`}>
            <AiFillFastBackward className="fill-current w-4 h-4 mr-2" />
            <span>{previous.title}</span>
        </Link>
        } 
        {next &&
        <Link className={buttonClasses} to={`/${next.slug}`}>
            <span>{next.title}</span>
            <AiFillFastForward className="fill-current w-4 h-4 ml-2" />
        </Link>
        }
      </div>
      {/* <div className="w-full bg-blue-900">
        DUD
        {next.title}
      </div> */}
      </>
    )
  }
}

const Header = ({ categories, title }) => (
  <div className="w-full flex px-4">
    <div className="w-2/3">
      <h1 className="font-bold" dangerouslySetInnerHTML={{ __html: title }} />
      {categories.nodes.map(({ name }) => (
        <span key={`post_cat${name}`} className="items-end bg-gray-400 p-1 rounded-lg">
          {name}
        </span>
      ))}
    </div>
  </div>
)
export default Post

export const postQuery = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        remoteFile {
          childImageSharp {
            fluid(quality: 90, maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      film {
        youtubeVideo
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
