import withErrorHandler from "@/server/utils/catchAsync"
import { z } from 'zod';
import Email from '@/server/utils/email';

export default withErrorHandler( async(event) => {
    const result = z.object({
    name: z.string().trim().nonempty("name is required"),
    email: z.string().trim().nonempty("email is required").email("Invalid email format"),
    subject: z.string().trim().nonempty("Subject is required"),
    message: z.string().trim().nonempty("message is required"),
    phoneNumber: z.string().trim().nonempty("phoneNumber is required"),
    }).safeParse(event.context.modifiedBody);
   
    if (!result?.success){
       throw createError({
            statusCode: 400,
            statusMessage:"request body validation failed",
            message: JSON.stringify(result.error.issues),
        });
    }

    new Email().contactus({
        email:event.context.modifiedBody.email,
        name: event.context.modifiedBody.name,
        phoneNumber: event.context.modifiedBody.phoneNumber,
        subject: event.context.modifiedBody.subject,
        message: event.context.modifiedBody.message
    })
    return{
        status: 'success',
        data: 'Your message has been sent successfully.'
    }
   
})