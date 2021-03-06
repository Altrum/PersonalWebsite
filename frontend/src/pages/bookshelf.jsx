import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { graphql } from "gatsby"
import Grid from '@material-ui/core/Grid';

import Title from '../components/title';
import BookCard from '../components/books/bookCard';

const styles = {
  offset: {
    margin: '2em 2em 0em 2em'
  },
};

const BookShelf = ({ classes, data }) => {
  const books = data.allGhostPost.edges;

  return (
    <main>
      <div className={classes.offset}>
        <Title>Books</Title>
      </div>
      <Grid 
        container
        direction='row'
        alignItems='center'
        justify='center'
      >
      {books.map((book) => 
        <Grid item key={book.node.title}>
          <BookCard
            slug={book.node.slug}
            imageUrl={book.node.feature_image}
            />
        </Grid>
      )}
      </Grid>
    </main>
  )
}

export default withStyles(styles)(BookShelf);

export const pageQuery = graphql`
  query BookPostQuery($limit: Int = 15) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        filter: {tags: {elemMatch: {name: {eq: "books"}}}}
    ) {
      edges {
        node {
          excerpt
          title
          created_at(formatString: "YYYY-MM-DD")
          slug
          feature_image
        }
      }
    }
  }
`
