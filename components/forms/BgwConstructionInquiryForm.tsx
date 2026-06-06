"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, type ReactNode, Suspense } from "react";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes";
import {
  bgwInquiryTypes,
  bgwProjectFocusOptions,
  type BgwInquiryType,
} from "@/lib/inquiry-types";

const initialState: ContactFormState = {
  success: false,
  message: "",
  errors: {},
};

const focusToInquiry: Record<string, BgwInquiryType> = {
  infrastructure: "BGW Infrastructure Project",
  commercial: "BGW Commercial Project",
  residential: "BGW Residential Project",
};

function BgwInquiryFormInner() {
  const searchParams = useSearchParams();
  const focus = searchParams.get("focus") ?? "";
  const defaultInquiry = focusToInquiry[focus] ?? "BGW Construction Inquiry";

  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <form action={formAction} className="relative space-y-6" noValidate>
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="fullName" label="Full Name" required error={state.errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            className={inputClass(state.errors.fullName)}
          />
        </FormField>
        <FormField id="organization" label="Organization" required error={state.errors.organization}>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            required
            className={inputClass(state.errors.organization)}
          />
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="email" label="Email" required error={state.errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass(state.errors.email)}
          />
        </FormField>
        <FormField id="phone" label="Phone" error={state.errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass(state.errors.phone)}
          />
        </FormField>
      </div>

      <FormField id="inquiryType" label="Inquiry Type" required error={state.errors.inquiryType}>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          defaultValue={defaultInquiry}
          className={inputClass(state.errors.inquiryType)}
        >
          {bgwInquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FormField>

      <fieldset>
        <legend className="text-sm font-medium text-brand-navy">Project Focus</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {bgwProjectFocusOptions.map((item) => (
            <label
              key={item}
              className="flex min-h-11 items-center gap-3 rounded-md border border-border px-4 py-2 text-sm text-zinc-700"
            >
              <input type="checkbox" name="projectFocus" value={item} />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <FormField id="message" label="Project Details" required error={state.errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Describe your construction or infrastructure project, location, timeline, and scope."
          className={inputClass(state.errors.message)}
        />
      </FormField>

      {state.message ? (
        <p
          role="status"
          aria-live="polite"
          className={`rounded-md px-4 py-3 text-sm ${
            state.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <p className="text-xs leading-relaxed text-zinc-500">
        By submitting this form, you agree to our{" "}
        <Link href={routes.privacy.path} className="font-semibold text-brand-blue hover:text-brand-navy">
          Privacy Policy
        </Link>
        . For general FTBS inquiries, use the{" "}
        <Link href={routes.contact.path} className="font-semibold text-brand-blue hover:text-brand-navy">
          main contact form
        </Link>
        .
      </p>

      <Button type="submit" disabled={isPending || state.success}>
        {isPending ? "Submitting..." : state.success ? "Submitted" : "Submit Construction Inquiry"}
      </Button>
    </form>
  );
}

export function BgwConstructionInquiryForm() {
  return (
    <Suspense fallback={<p className="text-sm text-zinc-500">Loading form...</p>}>
      <BgwInquiryFormInner />
    </Suspense>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

function FormField({ id, label, required, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-navy">
        {label}
        {required ? <span className="text-brand-blue"> *</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function inputClass(error?: string) {
  return `block w-full rounded-md border px-4 py-3 text-sm text-zinc-800 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
    error ? "border-red-400" : "border-border"
  }`;
}
