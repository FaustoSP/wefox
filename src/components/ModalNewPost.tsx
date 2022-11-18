import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Upload, UploadProps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import axios from "axios";
import { SetStateAction, useState } from "react";
import { PostClass } from "../classes/PostClass";

// Note: the image uploading function is just a mock up, it lacks a service to host the images
// therefore it stays loading forever.
// Its possible to set up an account on something like imgur or cloudinary to host them, but
// I thought showing how it could be done was more than enough.
// The code itself comes from the antd documentation: https://ant.design/components/upload/
function ModalNewPost({ setIsLoading }: any) {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>();

  // --------------------------------------------------------------
  // These two state variables are for the image uploading feature.
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  // --------------------------------------------------------------

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

  // --------------------------------------------------------------------------------------
  // The following section is to show how one would implement an image uploading feature
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUpload: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj as RcFile,
        (url: SetStateAction<string | undefined>) => {
          setLoading(false);
          setImageUrl(url);
        }
      );
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  // End of the section
  // --------------------------------------------------------------------------------------

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
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleUpload}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>

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
