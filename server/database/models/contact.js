import { z } from 'zod';

const base = z.object({
    fullName: z.string().trim().nonempty("name is required"),
    email: z.string().trim().nonempty("email is required").email("Invalid email format"),
    subject: z.string().trim().nonempty("Subject is required"),
    message: z.string().trim().nonempty("message is required"),
    phoneNumber: z.string().trim().nonempty("phoneNumber is required"),
})

export default {
  model: null,
  schema : null,
  zobSchema: {base}
}
