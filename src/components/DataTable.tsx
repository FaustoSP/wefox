import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Col, notification, Row, Skeleton, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostClass } from "../classes/PostClass";
import ModalNewPost from "./ModalNewPost";
import Post from "./Post";

function DataTable() {
  const [posts, setPosts] = useState<PostClass[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/posts").then((response) => {
      setPosts(response.data);
      setIsLoading(false);
    });
  }, [isLoading]);

  const deletePost = (id: number) => {
    setIsLoading(true);
    axios.delete(`http://localhost:3000/api/v1/posts/${id}`).then(() => {
      setIsLoading(false);
    });
  };

  const openNotification = () => {
    notification.open({
      message: "Notification Title",
      description: "You clicked a button",
    });
  };

  const generateCard = (post: PostClass) => {
    return (
      <Card
        key={post.id}
        style={{ width: "100%", height: "100%" }}
        cover={<img alt={post.title} src={post.image_url} />}
        actions={[
          <DeleteOutlined key="delete" onClick={() => deletePost(post.id)} />,
          <EditOutlined key="edit" onClick={() => openNotification()} />,
        ]}
      >
        {post.content}
      </Card>
    );
  };

  return (
    <div>
      {isLoading ? (
        <Space>
          <Skeleton.Image active />
          <Skeleton active />
        </Space>
      ) : (
        <div>
          {posts?.map((post) => (
            <Post post={post} setIsLoading={setIsLoading} />
          ))}
          <div>
            <ModalNewPost setIsLoading={setIsLoading} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
