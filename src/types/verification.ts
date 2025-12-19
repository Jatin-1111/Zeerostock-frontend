// Type definitions for supplier verification form
export interface VerificationFormData {
  identityVerification: {
    ownerName: string;
    idCard: string;
    proofOfAddress: string;
    aadharCard: string;
  };
  bankAccount: {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };
  businessDetails: {
    legalBusinessName: string;
    businessRegistrationNumber: string;
    businessType: string;
    taxId: string;
    ein: string;
    yearEstablished: string;
  };
  operationalInfo: {
    primaryAddress: string;
    warehouseLocation: string;
    businessPhone: string;
    businessEmail: string;
  };
  documents: {
    governmentId: string | null;
    proofOfAddress: string | null;
    businessLicense: string | null;
    certificateOfIncorporation: string | null;
    taxRegistration: string | null;
    iso9001: string | null;
    industryLicenses: string | null;
    auditReports: string | null;
  };
}

export type UpdateDataFunction = (section: string, data: Partial<any>) => void;
