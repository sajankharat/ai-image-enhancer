import axios from "axios";

const API_Key = "your API key";  // https://picwish.com/photo-enhancer-api
const Base_URL = "https://techhk.aoscdn.com/"
const MAXIMUM_RETRIES = 15;

export const EnhancedImageAPI = async (file) => {
   try {
     const taskId = await uploadImage(file);

     const enhancedImageData = await pollForEnhancedImage(taskId);
    
   return enhancedImageData;

   } catch (error) {
      console.log("Error enhancing image:", error.message);
   }
}


const uploadImage = async (file) => {
     const formData = new FormData();
     formData.append("image_file", file);


    const {data} = await axios.post(
        `${Base_URL}/api/tasks/visual/scale`,
         formData, 
       {
         headers: {
            "Content-Type" : "multipart/form-data",
            "X-API-KEY" : API_Key,
         },
         
        }
    )

    if (!data?.data?.task_Id) {
        throw new Error('Failed to upload image! Task ID not found');
    }
    
    return data.data.task_Id;

};

const pollForEnhancedImage = async (taskId, retries = 0) => {
    const result = await fetchEnhancedImage(taskId);

    if (result.state === 4) {

      console.log(`Processing... (${retries}/${MAXIMUM_RETRIES})`);

        if (retries >= MAXIMUM_RETRIES) {
            throw new Error('max retries reached')
        }

        // wait for 2 second 
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return pollForEnhancedImage(taskId, retries + 1);
    }

    return result;
}
  

const fetchEnhancedImage = async (taskId) => {
   const { data } = await axios.get(
        `${Base_URL}/api/tasks/visual/scale/${taskId}`,
       {
         headers: {
            "X-API-KEY" : API_Key,
         },
         
        }
    )

    if (!data?.data) {
        throw new Error('Failed to fetch enhanced image! Image not found.');
    }

    return data.data;
   
}