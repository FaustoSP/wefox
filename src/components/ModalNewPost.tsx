import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { useState } from "react";
import { PostClass } from "../classes/PostClass";

function ModalNewPost({ setIsLoading }: any) {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>();

  const toogleModal = () => {
    setModalIsVisible(!modalIsVisible);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    let newPost = new PostClass(
      values.title,
      values.content,
      "lat",
      "long",
      "img",
      new Date().toISOString(),
      new Date().toISOString()
    );
    setIsLoading(true);
    axios.post("http://localhost:3000/api/v1/posts", newPost).then(() => {
      setIsLoading(false);
      setModalIsVisible(false);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={toogleModal} block>
        Create new post
      </Button>
      <Modal
        title="New Post"
        open={modalIsVisible}
        onCancel={() => setModalIsVisible(false)}
        footer={[
          <Button form="newPost" key="submit" htmlType="submit" type="primary">
            Submit
          </Button>,
          <Button onClick={() => setModalIsVisible(false)}>Cancel</Button>,
        ]}
      >
        <Form
          name="newPost"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please type a title" },
              { min: 3, message: "Title must be at least 3 characters long" },
              { max: 20, message: "Title must be at most 20 characters long" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[
              { required: true, message: "Share your thoughts" },
              {
                min: 10,
                message: "Content must be at least 10 characters long",
              },
              {
                max: 300,
                message: "Content must be at most 300 characters long",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalNewPost;
