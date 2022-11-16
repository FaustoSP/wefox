import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, notification, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { PostType } from "../classes/PostType";

function DataTable() {
  const [posts, setPosts] = useState<PostType[]>();

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/posts").then((response) => {
      setPosts(response.data);
      console.log(response.data);
    });
  }, []);

  const openNotification = () => {
    notification.open({
      message: "Notification Title",
      description: "You clicked a button",
    });
  };

  const generateCard = (post: PostType) => {
    return (
      <Card
        style={{ width: 300, height: 400 }}
        cover={<img alt={post.title} src={post.image_url} />}
        actions={[
          <DeleteOutlined key="delete" onClick={() => openNotification()} />,
          <EditOutlined key="edit" onClick={() => openNotification()} />,
        ]}
      >
        {post.content}
      </Card>
    );
  };

  return <Space>{posts?.map((post) => generateCard(post))}</Space>;
}

export default DataTable;
