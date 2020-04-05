import React from "react"
import Card from "../components/parts/card"
import Pagination from "../components/parts/pagination"

export default ({posts, currentPage, numPages, title}) => (
    <>
          <div className="flex flex-wrap main-index -mx-2 lg:pt-6">
            {posts.edges.map(({ node }) => (
              <Card key={`card${node.slug}`} node={node} />
            ))}
            {numPages > 1 && (
              <Pagination currentPage={currentPage} numPages={numPages} />
            )}
          </div>
      </>
)