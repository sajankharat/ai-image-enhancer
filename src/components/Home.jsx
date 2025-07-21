import { useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import { EnhancedImageAPI } from "../utils/EnhancedImageAPI.js";

const Home = () => {
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setloading] = useState(false);

    const uploadImageHandler = async (file) => {
        setUploadImage(URL.createObjectURL(file));
        setloading(true)
        // call the API to enhance the image
        try {
            const enhancedURL = await EnhancedImageAPI(file);
            setEnhancedImage(enhancedURL)
            setloading(false)
        } catch (error) {
            alert('error while enhancing the Image.')
        }

    };
     
    return (
        <>
            <ImageUpload UploadImageHandler = {uploadImageHandler} />
            <ImagePreview loading ={loading} uploaded={uploadImage} enhanced={enhancedImage?.image}/>
        </>
    )
}

export default Home;

 