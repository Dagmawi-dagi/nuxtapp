import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { DataTypes } from 'sequelize';
import  sequelize  from '@/server/database/sequelizeConnection';
import { z } from 'zod';


const _schema = {
  userName:  { type: DataTypes.STRING, allowNull: false, unique: true,defaultValue: 'username' },
  email:{ type: DataTypes.STRING, allowNull: false, unique: true ,
    validate: {
        isEmail: true, 
    }
  },
  phoneNumber:{
    type:  DataTypes.STRING,
    allowNull: false,
    unique: true 
  },
  userPassword: {
    type:  DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8, 
      notEmpty: true, // Ensures it’s not empty
    },
  },
  avatar:{
    type:  DataTypes.STRING,
    defaultValue: 'jpeg-default.jpeg',
  },
  passwordChangedAt: {type: DataTypes.DATE},
  passwordResetToken: {type: DataTypes.STRING},
  passwordResetExpires: {type: DataTypes.DATE},
  lastLoggedIn:{
    type:  DataTypes.DATE,
  },
  active:{
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  role:{
    type: DataTypes.JSON,
    allowNull: false,
    arrayOfStrings: true,
    allowed: ['user', 'admin'],
    defaultValue: ['user'],
    validate: {
      isArrayOfAllowedValues(value) {
        const allowed = ['user', 'admin'];
        if (!Array.isArray(value)) throw new Error('user role must be an array of strings');
        for (const v of value) {
          if (!allowed.includes(v)) throw new Error(`Invalid value user role: ${v}`);
        }
      }
    },
  },
}

const user = sequelize.define('user', _schema, {
  tableName: 'users',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['userPassword','active'] },
  },
});


const base = z.object({
  userName: z.string()
    .min(1, "Username is required")
    .max(50, "Username must be less than 50 characters"),

  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),

  phoneNumber: z.string()
    .min(1, "Phone number is required"),

  userPassword: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number")
    // .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

  avatar: z.string()
    .optional()
    .default('jpeg-default.jpeg'),

  passwordChangedAt: z.coerce.date()
    .optional(),

  passwordResetToken: z.string()
    .optional(),

  passwordResetExpires: z.coerce.date()
    .optional(),

  lastLoggedIn: z.coerce.date()
    .optional(),

  active: z.boolean()
    .optional()
    .default(true),

  role: z.array(
    z.enum(["user", "admin"], {
      errorMap: (v) => ({ message: `user role as "${v.received}" not supported`})
    })
  )
  .nonempty("Role array cannot be empty")
  .default(["user"])
});

// CRUD Operation Specific Schemas
const updateSchema = z.object({
  userName: base.shape.userName.optional(),
  avatar: base.shape.avatar.optional()
}).strict({message: 'This api only update your USERNAME and PROFILE picture'});

const updatePasswordSchema = z.object({
  userPassword: base.shape.userPassword, // current password
  newPassword: z.string()
    .min(1, "New password is required")
    .min(8, "New password must be at least 8 characters")
    // .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "New password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "New password must contain at least one number")
    // .regex(/[^A-Za-z0-9]/, "New password must contain at least one special character")
});
const updatePhonenumberSchema = z.object({
  userPassword: base.shape.userPassword, // current password
  newPhoneNumber: base.shape.phoneNumber // new phone number
});
const updateEmailSchema = z.object({
  userPassword: base.shape.userPassword, // current password
  email: base.shape.email // new phone number
});
const loginSchema = base.pick({ email: true, userPassword: true });
const resetPasswordSchema = base.pick({ passwordResetToken: true, userPassword: true });
const full = base.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});

//---------- create our relationships--------------//

user.associate = function (models){
  user.hasMany(models.blog, { foreignKey: 'createdBy' });
  user.hasMany(models.newsletter, { foreignKey: 'createdBy' });
}

// hashing the password on save
user.beforeSave("",async function (model){
  // password will only be encrypt on create or update (.save())
  if(model._changed.has('userPassword'))  model.userPassword = await bcrypt.hash(model.userPassword,12)
})

// here only do all the find operation on user that are active: true
user.beforeFind('',function(options){
  options.where = {
    ...options.where,
    active: true
  };
})

// // createPasswordResetToken to be sent via provided email
user.prototype.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  // save the incrypted version of the resetToken on th DB
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // only valid for 10 min
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};


// Usage example
export default {
  model: user,
  schema : _schema,
  zobSchema: {
    base,
    full,
    updatePasswordSchema,
    updatePhonenumberSchema,
    updateEmailSchema,
    updateSchema,
    loginSchema,
    resetPasswordSchema
  }
}