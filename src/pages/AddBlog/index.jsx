import React, { useState } from 'react';
import { Form, Input, Button, Card, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom';
import { createBlog } from '../../service/httpApiCalls/blog';
import './index.css'

const BlogForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [form] = Form.useForm(); // Create a form instance
    const navigate = useNavigate()

    const openNotification = ({ message, type }) => {
        notification.open({
            message,
            duration: 200,
            type
        });
    };

    const validateForm = async () => {
        try {
            await form.validateFields();
            handleSubmit();
        } catch (err) {
            console.error('Form validation error:', err);
            openNotification({
                message: 'Form validation failed. Please check the fields.',
                type: 'error'
            });
        }

    };

    const handleSubmit = async () => {
        try {
            let data = {
                title, content
            }
            const createData = await createBlog(data)
            if (createData?.status === 201 || 200) {
                setContent("");
                setTitle("");
                openNotification({
                    message: 'Blog Created Successfully',
                    type: 'success'
                });

                setTimeout(()=>{
                    navigate('../')
                },300)
                
            }
            console.log(createData);
        } catch (err) {
            openNotification({
                message: 'Form validation failed. Please check the fields.',
                type: 'error'
            });
        }
    };

    return (
        <>
            <div className="form-container"> {/* Add a class to the container */}
                <Card title="Create Blog">
                    <Form form={form} layout="vertical" onFinish={validateForm} name="myForm"
                    >
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title!' }]}>
                            <Input value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please enter the content!' }]}>
                            <Input.TextArea rows={4} value={content} onChange={e => setContent(e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Link to="/"> {/* Back button linking to the home page */}
                                <Button style={{ marginLeft: '125px' }} icon={<ArrowLeftOutlined />}>Back To Home</Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default BlogForm;
