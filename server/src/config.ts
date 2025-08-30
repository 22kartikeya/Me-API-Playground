import dotenv from 'dotenv';
dotenv.config();

export const mongo_url = process.env.MONGO_URI || "";
export const port = process.env.PORT || 3000;