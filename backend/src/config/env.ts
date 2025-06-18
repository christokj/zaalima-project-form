import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env variables
dotenv.config();

// Define the schema for required env variables
const envSchema = z.object({
    MONGO_URI: z.string().startsWith('mongodb'),
    ACCESS_TOKEN_SECRET: z.string().min(10, 'JWT_SECRET must be at least 10 characters long'),
    REFRESH_TOKEN_SECRET: z.string().min(10, 'JWT_SECRET must be at least 10 characters long'),
    PORT: z.string().regex(/^\d+$/).transform(Number).default('3000'),
});

// Parse and validate
const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.format());
    process.exit(1); // Stop the app
}

// Export the validated env
export const ENV = result.data;