import axios  from "axios";


const upload = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'ecogest');

  try {
    const res = await axios.post("http://api.cloudinary.com/v1_1/ecogest/image/upload", data);

    const {url} = res.data;
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};

export default upload;
