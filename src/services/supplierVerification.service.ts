import { apiRequest } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

export interface VerificationDraft {
  user_id: string;
  step_data: Record<string, any>;
  current_step: number;
  last_saved_at: string;
}

export interface VerificationStatus {
  status: "not_started" | "pending" | "approved" | "rejected" | "under_review";
  verification: any;
  userRole: any;
  hasDraft: boolean;
  draft?: VerificationDraft;
}

export interface DocumentUploadResponse {
  url: string;
  publicId: string;
  documentType: string;
}

export const supplierVerificationService = {
  /**
   * Save verification draft (auto-save)
   */
  async saveDraft(
    stepData: Record<string, any>,
    currentStep: number
  ): Promise<ApiResponse<VerificationDraft>> {
    return apiRequest("post", "/supplier/verification/draft", {
      stepData,
      currentStep,
    });
  },

  /**
   * Get saved draft
   */
  async getDraft(): Promise<ApiResponse<VerificationDraft | null>> {
    return apiRequest("get", "/supplier/verification/draft");
  },

  /**
   * Upload document to Cloudinary
   */
  async uploadDocument(
    file: File,
    documentType: string
  ): Promise<ApiResponse<DocumentUploadResponse>> {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("documentType", documentType);

    return apiRequest("post", "/supplier/verification/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Submit complete verification
   */
  async submitVerification(
    data: Record<string, any>
  ): Promise<ApiResponse<any>> {
    return apiRequest("post", "/supplier/verification/submit", data);
  },

  /**
   * Get verification status
   */
  async getStatus(): Promise<ApiResponse<VerificationStatus>> {
    return apiRequest("get", "/supplier/verification/status");
  },
};
