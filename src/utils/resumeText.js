
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import { AppError } from "./appError.js";

export const extractResumeText = async (buffer, contentType) => {
    let text = "";

    try {
        if (contentType === "application/pdf") {
            const parser = new PDFParse({ data: buffer });

            try {
                const result = await parser.getText();
                text = result.text;
            } finally {
                await parser.destroy();
            }
        } else if (
            contentType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        } else {
            throw new AppError("Unsupported resume file type", 400);
        }

        if (!text || !text.trim()) {
            throw new AppError(
                "No readable text found in the resume",
                400
            );
        }

        return text.trim();
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        console.error("Resume text extraction error:", error);

        throw new AppError(
            "Failed to extract text from resume",
            400
        );
    }
};
