import API from "../../../utils/API";
import axios from "axios";

export const uploadFiles = async (
  id: string,
  files: File[],
  setProgress: (p: number) => void,
  source: any
) => {
  const config = {
    onUploadProgress: function (progressEvent: any) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentCompleted);
    },
    cancelToken: source.token,
  };

  const uploaders = files.map((file) => {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("tags", `codeinfuse, medium, gist`);
    // formData.append("upload_preset", "pvhilzh7"); // Replace the preset name with your own
    // formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key
    // formData.append("timestamp", (Date.now() / 1000) | 0);

    return API.post(`/users/${id}/photos`, formData, config);
    // ;.then(
    //   (response) => {
    //     const data = response.data;
    //     const fileURL = data.secure_url; // You should store this URL for future references in your app
    //     console.log("lets see data = ", data);
    //   }
    // );
  });

  return await axios.all(uploaders);
};
