import { z } from 'zod';

/**
 * Generate Zod schema from Sequelize schema with validators.
 *
 * @param {Object} sequelizeModelSchema - Sequelize schema (definition)
 * @param {string} schemaName - Used for error messages
 * @returns {z.ZodObject} - Zod validation schema
 */
export function generateZodSchema(sequelizeModelSchema, schemaName = 'Schema') {
  const zodShape = {};
  

  for (const [field, config] of Object.entries(sequelizeModelSchema)) {
    if (!config.type) continue;

    const typeKey = config.type.key || config.type.toSql?.().split('(')[0];
    let zodField;

    switch (typeKey) {
      case 'STRING':
      case 'TEXT':
        zodField = z.string();
        break;
      case 'INTEGER':
      case 'BIGINT':
      case 'FLOAT':
      case 'DOUBLE':
      case 'DECIMAL':
        zodField = z.number();
        break;
      case 'BOOLEAN':
        zodField = z.boolean();
        break;
      case 'DATE':
      case 'DATEONLY':
        zodField = z.coerce.date(); // accepts string/date input
        break;
      case 'JSON':
        zodField = z.any(); // or refine if structured
        break;
    }

    const validators = config.validate || {};

    // --- Handle STRING validators
    if (typeKey === 'STRING') {
      if (validators.len) {
        const [min, max] = validators.len;
        zodField = zodField.min(min).max(max);
      }
      if (validators.notEmpty) {
        zodField = zodField.min(1);
      }
      if (validators.isIn) {
        zodField = zodField.refine(val => validators.isIn[0].includes(val), {
          message: `${field} must be one of: ${validators.isIn[0].join(', ')}`,
        });
      }
      if (validators.is instanceof RegExp || typeof validators.is === 'string') {
        const pattern = validators.is instanceof RegExp ? validators.is : new RegExp(validators.is);
        zodField = zodField.regex(pattern, { message: `${field} format is invalid` });
      }
    }

    // --- Handle NUMBER validators
    if (['INTEGER', 'FLOAT', 'DECIMAL', 'DOUBLE'].includes(typeKey)) {
      if (validators.min !== undefined) {
        zodField = zodField.min(validators.min);
      }
      if (validators.max !== undefined) {
        zodField = zodField.max(validators.max);
      }
    }

    // --- Optional/nullable handling
    if (config.allowNull) {
      zodField = zodField.optional().nullable();
    } else if (config.defaultValue !== undefined || config.autoIncrement || config.primaryKey) {
      zodField = zodField.optional();
    }

    zodShape[field] = zodField;
  }

  return z.object(zodShape);
}




// z.object({
//   name: z.string()
//     .min(3)
//     .max(20)
//     .min(1)
//     .refine(val => ['John', 'Jane', 'Doe'].includes(val))
//     .regex(/^[A-Z][a-z]+$/),

//   age: z.number().min(18).max(65),
//   isActive: z.boolean().optional(),
//   birthDate: z.coerce.date().optional(),
//   hobbies: z.any().optional(), // you can use z.array(z.string()) if always an array
// })
