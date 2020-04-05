import React from "react"
import Layout from "../components/layout"
import Card from "../components/parts/card"
import Pagination from "../components/parts/pagination"

export default ({posts, currentPage, numPages, title}) => (
    <>
        <Layout title={title} mainColor="bg-lightpurple">
          <div className="flex flex-wrap main-index -mx-2 pt-6">
            {posts.edges.map(({ node }) => (
              <Card key={`card${node.slug}`} node={node} />
            ))}
            {numPages > 1 && (
              <Pagination currentPage={currentPage} numPages={numPages} />
            )}
          </div>
        </Layout>
      </>
)