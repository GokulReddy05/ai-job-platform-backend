import prisma from "../config/db.js";
import supabase from "../config/supabase.js";
import { AppError } from "../utils/appError.js";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {extractResumeText} from "../utils/resumeText.js"

export const uploadResumeService = async(file,userId)=>{
    const extension = path.extname(file.originalname).toLowerCase();
    const storageKey = `${userId}/${randomUUID()}${extension}`;

    const extractedText = await extractResumeText(file.buffer,file.mimetype)

    const uploadResumeToStorage = await supabase.storage.from("resumes").upload(storageKey, file.buffer,{
        contentType: file.mimetype,
        upsert: false
    });
    if(uploadResumeToStorage.error){
        console.error("Supabase upload error:", uploadResumeToStorage.error);
        throw new AppError("Upload Error",500)
    }
    try {
          const uploadResume = await prisma.documents.create({
        data:{
            owner_id : userId,
            original_filename : file.originalname,
            storage_key: storageKey,
            file_size: BigInt(file.size),
            content_type : file.mimetype,
            extracted_text : extractedText
        }
    })
      return uploadResume
   } catch (error) {
    console.error("Database insert failed:", error);

    const cleanupResult = await supabase.storage
        .from("resumes")
        .remove([storageKey]);

    if (cleanupResult.error) {
        console.error("Failed to clean up uploaded resume:", cleanupResult.error);
    }

    throw error;
}
}

export const getResumeService = async(userId)=>{
    const getResume = await prisma.documents.findMany({
        where :{
            owner_id : userId
        }
    })
    return getResume
}