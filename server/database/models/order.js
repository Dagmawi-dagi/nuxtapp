import { z } from 'zod';

const base = z.object({
    fullName: z.string().trim().nonempty("FullName is required"),
    email: z.string().trim().nonempty("email is required").email("Invalid email format"),
    phoneNumber: z.string().trim().nonempty("phoneNumber is required"),
    country: z.string().trim().nonempty("country is required"),
    orderArea: z.string().trim().nonempty("orderArea is required"),
    product: z.string().trim().nonempty("product is required"),
    FileAttachments: z.array(z.string()) // multiple files
        .nonempty("At least one file must be uploaded")
        .max(10, "Maximum 10 files allowed")
        .refine(files => files.every(file => {
            const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
            return validExtensions.some(ext => file.toLowerCase().endsWith(ext));
        }, {
            message: "Files must be PDF, DOC, DOCX, or TXT format"
        })),
})


export default {
  model: null,
  schema : null,
  zobSchema: {base}
}
