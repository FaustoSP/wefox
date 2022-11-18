import { Skeleton, Space } from "antd";
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
