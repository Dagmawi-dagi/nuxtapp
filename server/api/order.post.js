import withErrorHandler from "@/server/utils/catchAsync"
import { z } from 'zod';
import Email from '@/server/utils/email';

export default withErrorHandler( async(event) => {
    const info = event.context.modifiedBody
    const files = event.context.uploadedFiles || [];
    await new Email().order(info, files);
    // save the uploaded files if the create crud goes successfully
    for (const file of files) await saveFile(file.buffer, file.filePath); // processed buffer is already read
    
    return{
        status: 'success',
        data: 'Your message has been sent successfully.'
    }
   
})