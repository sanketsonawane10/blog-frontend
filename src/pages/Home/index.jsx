import React, { useState, useEffect } from 'react';
import { Card, Button, Menu, Row, Col, Pagination } from 'antd'; // Import Row and Col from Ant Design
import { Link } from 'react-router-dom'; // If using React Router for navigation
import { HomeOutlined, PlusOutlined } from '@ant-design/icons'; // Icons for the menu
import { getBlogList } from '../../service/httpApiCalls/blog';
import './index.css';

const BlogHomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCOunt] = useState();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getBlogListData({ page });
  };

  const getBlogListData = async (data) => {
    try {
      setLoading(true);
      const result = await getBlogList({ ...data });
      if (result?.data?.data?.rows?.length) {
        const { count, rows } = result?.data?.data;
        setBlogs(rows);
        setTotalCOunt(count);
        setLoading(false);
      } else {
        setBlogs([]);
        setTotalCOunt();
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setBlogs([]);
      setTotalCOunt();
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogListData();
  }, []);

  return (
    <>
      <div className="header-container">
      {/* <h2 style={{marginRight:"50px"}}>SNK BLOG</h2> */}
        <Menu mode="horizontal" selectedKeys={current}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="create-blog" icon={<PlusOutlined />}>
            <Link to="/create-blog">Create Blog</Link>
          </Menu.Item>
        </Menu>
      </div>
      {loading ? "Loading..." :
        <div>
          <Row gutter={[16, 16]}> {/* Ant Design Row component with gutter spacing */}
            {blogs.map(blog => (
              <Col key={blog.id} xs={24} sm={12} md={8} lg={6}> {/* Ant Design Col component with responsive sizing */}
                <Card title={blog.title}>
                  <p className="truncate">{blog.content}</p>
                  <Link to={`/blog/${blog.blog_id}`}>
                    <Button type="link">Read more</Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
          <div>
            {/* Render your data here */}
            <Pagination
              style={{ marginTop: '20px', marginBottom: '20px' }}
              current={currentPage}
              total={totalCount} // Total number of items/pages
              pageSize={10} // Number of items per page
              onChange={handlePageChange}
            />
          </div>
        </div>
      }
    </>
  );
};

export default BlogHomePage;
