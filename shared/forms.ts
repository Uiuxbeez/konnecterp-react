export type FormFieldType = "text" | "email" | "tel" | "textarea" | "select" | "file";

export interface FormFieldDef {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface FormSettings {
  title: string;
  shortDescription: string;
  submitButtonText: string;
  successTitle: string;
  successMessage: string;
  antiSpamEnabled: boolean;
  emailRecipient?: string;
}

export interface FormDefinitionContent {
  fields: FormFieldDef[];
  settings: FormSettings;
}

export const DEFAULT_DEMO_FORM: FormDefinitionContent = {
  settings: {
    title: "Request Your Free Demo",
    shortDescription: "See How Manufacturing Industry-Specific Konnect ERP Fits Your Operations",
    submitButtonText: "Book Free Demo",
    successTitle: "You're all set!",
    successMessage: "We've received your request. Our team will contact you within 24 hours.",
    antiSpamEnabled: true,
    emailRecipient: "sales@konnectbi.com",
  },
  fields: [
    { id: "name", label: "Full Name", type: "text", placeholder: "Rajesh Kumar", required: true },
    { id: "company", label: "Company Name", type: "text", placeholder: "Acme Manufacturing Ltd.", required: true },
    { id: "email", label: "Business Email", type: "email", placeholder: "rajesh@acme.com", required: true },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", required: true },
    { id: "size", label: "Company Size", type: "select", placeholder: "Employees", required: true, options: ["1-10", "11-50", "51-200", "201-500", "500+"] },
    { id: "module", label: "Specific Requirements", type: "textarea", placeholder: "Describe any specific requirements", required: false },
  ],
};
