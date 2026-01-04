// src/utils/validation.js
const { z } = require('zod');
const { ValidationError } = require('../utils/errors');

// Common validation schemas
const idSchema = z.string().min(1, 'ID is required');
const titleSchema = z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title cannot exceed 200 characters');
const contentSchema = z.string().min(10, 'Content must be at least 10 characters');
const booleanSchema = z.boolean().optional().default(false);

// Post validation schemas
const createPostSchema = z.object({
  title: titleSchema,
  content: contentSchema,
  published: booleanSchema,
  tags: z.array(z.string().min(1, 'Tag cannot be empty')).optional().default([])
});

const updatePostSchema = z.object({
  title: titleSchema.optional(),
  content: contentSchema.optional(),
  published: booleanSchema.optional(),
  tags: z.array(z.string().min(1, 'Tag cannot be empty')).optional()
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

// Validation middleware
const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      throw new ValidationError('Validation failed', errors);
    }
    req.validatedData = result.data;
    next();
  } catch (error) {
    next(error);
  }
};

// GraphQL validation middleware
const validateInput = (input, schema) => {
  const result = schema.safeParse(input);
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    throw new ValidationError('Validation failed', errors);
  }
  return result.data;
};

module.exports = {
  validate,
  validateInput,
  schemas: {
    id: idSchema,
    createPost: createPostSchema,
    updatePost: updatePostSchema
  }
};