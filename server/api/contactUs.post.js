import withErrorHandler from "@/server/utils/catchAsync"
import { z } from 'zod';
import Email from '@/server/utils/email';

export default withErrorHandler( async(event) => {
    const info = event.context.modifiedBody
    new Email().contactus(info)
    return{
        status: 'success',
        data: 'Your message has been sent successfully.'
    }
   
})