import { useStaticQuery, graphql } from "gatsby"
export const useSiteMetadata = () => {
  const { site, logo } = useStaticQuery(
    graphql`
      query {
        logo: file(absolutePath: { regex: "/koronka_logo.svg/" }) {
            publicURL
        }
        site {
            siteMetadata {
                title
                social {
                    icon
                    url
                }
                description
                wordpressUrl
                siteUrl
            }
        }
      }
    `
  )
  return { site, logo }
}