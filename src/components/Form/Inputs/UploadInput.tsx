import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload, message } from "antd";

const props: UploadProps = {
  name: "file",
  maxCount: 1,
  beforeUpload: () => false,
  headers: {
    authorization: "authorization-text",
  },
  onChange() {
    message.success("Archivo subido exitosamente", 5);
  },
};

const UploadInput = ({ name }: { name: string }) => (
  <div className="w-full flex justify-center">
    <Upload {...props} className="w-fit">
      <Button icon={<UploadOutlined />}>{name}</Button>
    </Upload>
  </div>
);

export default UploadInput;
