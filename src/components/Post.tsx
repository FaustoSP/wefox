import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Card, Form, Input, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import { useState } from "react";
import { PostClass } from "../classes/PostClass";

function Post({ post, setIsLoading }: any) {
  // State variable that memorizes wheter the card is in edit mode, or view mode.
  // If its in edit mode, inputs will be displayed instead of plain text
  const [isEditable, setIsEditable] = useState<boolean>();
  const [newContent, setNewContent] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");

  // This two state variables bind the forms. See editPost.
  const [formTitle] = Form.useForm();
  const [formContent] = Form.useForm();

  const toogleIsEditable = () => {
    setIsEditable(!isEditable);
  };

  const deletePost = (id: number) => {
    setIsLoading(true);
    axios.delete(`http://localhost:3000/api/v1/posts/${id}`).then(() => {
      setIsLoading(false);
    });
  };

  // This code might look weird. The two inputs used to edit the title and content, respectively, and they
  // need validation, which is why they are wrapped around a Form component. The problem is, this are separate
  // forms with no button to submit, so there is no way to stop a submit with an incorrect validation.
  // The solution is to bind each one to a state variable and manually trigger the validation. If it resolves,
  // the new post is instantiated and the PUT request is sent.
  const editPost = (id: number) => {
    formTitle.validateFields().then(() => {
      formContent.validateFields().then(() => {
        setIsLoading(true);
        let editedPost = new PostClass(
          newTitle,
          newContent,
          "lat",
          "long",
          post.image_url,
          post.created_at,
          new Date().toISOString()
        );
        editedPost.id = id;
        axios
          .put(`http://localhost:3000/api/v1/posts/${id}`, editedPost)
          .then(() => {
            setIsLoading(false);
          });
      });
    });
  };

  // I find it really cool that we can pass funtional components as props.
  // Thanks to that we can turn the title into an input.

  // There is currently a bug that cause the validation to fail if the user doesn't change the
  // default value of the input. I have been unable to find the cause, or to find a similar
  // issue documented officially.
  return (
    <Card
      key={post.id}
      title={
        isEditable ? (
          <Form form={formTitle}>
            <Form.Item
              label=""
              name="newTitle"
              rules={[
                { required: true, message: "Please type a title" },
                { min: 3, message: "Title must be at least 3 characters long" },
                {
                  max: 20,
                  message: "Title must be at most 20 characters long",
                },
              ]}
            >
              <Input
                defaultValue={post.title}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Item>
          </Form>
        ) : (
          post.title
        )
      }
      style={{ width: 1000, height: "100%", marginBottom: "10px" }}
      cover={<img alt={post.title} src={post.image_url} />}
      actions={[
        <DeleteOutlined key="delete" onClick={() => deletePost(post.id)} />,
        isEditable ? (
          <Space>
            <CloseOutlined key="cancel" onClick={() => toogleIsEditable()} />
            <CheckOutlined key="apply" onClick={() => editPost(post.id)} />
          </Space>
        ) : (
          <EditOutlined key="edit" onClick={() => toogleIsEditable()} />
        ),
      ]}
    >
      {isEditable ? (
        <Form form={formContent}>
          <Form.Item
            label=""
            name="newContent"
            rules={[
              { required: true, message: "Please type something" },
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
            <Input
              defaultValue={post.content}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </Form.Item>
        </Form>
      ) : (
        post.content
      )}
      <Meta
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        description={`Created at: ${new Date(
          post.created_at
        ).toUTCString()} | Updated at: ${new Date(
          post.updated_at
        ).toUTCString()}`}
      />
    </Card>
  );
}

export default Post;
