import React from 'react';
import Blog from '../Templates/Blog';
import BlogHome from './BlogHome';



class BlogPage extends React.Component {
  render() {

    return (
      <Blog >
          <BlogHome></BlogHome>
      </Blog>
    );
  }
}

export default BlogPage;