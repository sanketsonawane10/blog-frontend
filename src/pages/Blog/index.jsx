import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Assuming you're using React Router for routing
import { getBlogList } from '../../service/httpApiCalls/blog';
import { Card, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Meta } = Card;

const BlogDetailPage = () => {
  const { id } = useParams(); // Assuming your blog posts have unique IDs
  const [blog, setBlog] = useState(null); // State to hold the blog data

  useEffect(() => {
    // Fetch blog data from an API or other data source
    const fetchBlog = async () => {
      try {
        const result = await getBlogList({
          search: '',
          filters: `blog_id:eq:${id}`,
          attributes: '',
          sort: '',
          page: '',
          limit: ''
        });
        if (result?.data?.data?.rows?.length) {
          const finalResult = result?.data?.data?.rows[0]
          setBlog(finalResult);
        } else {
          setBlog({});
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setBlog({});
      }
    };

    fetchBlog();
  }, [id]);

  // Render loading state while fetching blog data
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card
        style={{ width: '100%', maxWidth: 800, margin: 'auto' }}
      >
        <Meta title={blog.title} description={blog.content} />
        {/* Render other blog details as needed */}
      </Card>

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <Link to="/"> {/* Back button linking to the home page */}
          <Button icon={<ArrowLeftOutlined />}>Back To Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailPage;
