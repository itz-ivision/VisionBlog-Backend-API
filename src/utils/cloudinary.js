import { v2 as cloudiNary} from 'cloudinary';
import fs from 'fs';


cloudiNary.config(
    {   
        cloud_name: YOUR_CLOUD_NAME,
        api_key: YOUR_CLOUD_API_KEY,
        api_secret: YOUR_CLOUD_API_SECRET
    });

const uploadOnCloudinary = async (loaclFile) => {
    try {
        
        if (!loaclFile) {
            return null
        }
        const response = await cloudiNary.uploader.upload(loaclFile,{
            resource_type: 'auto'
        });
        fs.unlinkSync(loaclFile);
        return response;

    } catch (error) {
        fs.unlinkSync(loaclFile);
        return nulll;
    }
}


export { uploadOnCloudinary }