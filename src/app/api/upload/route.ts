import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { MAX_FILE_MB } from "@/lib/intake";

const DECK_TYPES = ["application/pdf"];
const DOC_TYPES = [
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
];

/**
 * Issues short-lived client-upload tokens for Vercel Blob. The browser
 * uploads directly to blob storage (bypassing the 4.5MB function body
 * limit); this route only authorises the upload. `clientPayload` is set by
 * the pitch form: "deck" restricts to PDF, anything else allows the wider
 * supporting-document set.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!pathname.startsWith("intake/")) {
          throw new Error("Invalid upload path");
        }
        const isDeck = clientPayload === "deck";
        return {
          allowedContentTypes: isDeck ? DECK_TYPES : DOC_TYPES,
          maximumSizeInBytes: MAX_FILE_MB * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      // Fires from Vercel's side after the browser finishes uploading. The
      // form records the URL on submit, so there's nothing to do here.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    );
  }
}
