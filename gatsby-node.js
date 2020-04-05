const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // query content for WordPress posts
  const result = await graphql(`
    query {
      allWpPost(sort: {fields: [date], order: DESC}) {
        edges {
          node {
            id
            slug
            title
            excerpt
            featuredImage {
              remoteFile {
                childImageSharp {
                  fixed {
                    src
                  }
                }
              }
            }
          }
        }
      }
      allWpCategory {
        edges {
          node {
            count
            id
            slug
            name
          }
        }
      }
    }
  `)
  const posts = result.data.allWpPost.edges
  const postsPerPage = 30
  createPages(
    false,
    createPage, 
    Math.ceil(posts.length / postsPerPage),
    path.resolve("./src/templates/index.js"),
    `/`, `/`,
    postsPerPage,
    false
  )
  
  const catPosts = result.data.allWpCategory.edges
  catPosts.forEach(({node}) => {
    if (node.count) {
      createPages(
        node.id,
        createPage,
        Math.ceil(node.count / postsPerPage),
        path.resolve("./src/templates/category.js"),
        `/${node.slug}`, `/${node.slug}/`,
        postsPerPage,
        node.name
      )
    }
  })  

  const postTemplate = path.resolve(`./src/templates/post.js`)
  posts.forEach(({node}, i, allPosts) => {
    createPage({
      path: node.slug,
      component: slash(postTemplate),
      context: {
        id: node.id,
        pageName: node.title,
        description: node.excerpt,
        image: node.featuredImage && node.featuredImage.remoteFile.childImageSharp.fixed.src || false,
        pageType: "post",
        next: i + 1 < allPosts.length ? nextPrevPost(allPosts[i+1]) : null,
        previous: i > 0 ? nextPrevPost(allPosts[i-1]) : null
      },
    })
  })
}

const createPages = (id, createPage, pagesLength, template, pathInitial, pathIteration, postsPerPage, pageName) => {
  Array.from({ length: pagesLength }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `${pathInitial}` : `${pathIteration}${i + 1}`,
      component: template,
      context: {
        id: id,
        limit: postsPerPage,
        skip: i * postsPerPage,
        pagesLength,
        currentPage: i + 1,
        pageName: pageName
      },
    })
  })
}

const nextPrevPost = (post) => {
  return {
    slug: post.node.slug,
    title: post.node.title
  }
}