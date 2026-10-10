"use client";

import React, { useState } from "react";
import { Send, Check, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact } from "@/lib/api";
import { showAlert } from "@/lib/alerts";
import type { TranslationsType } from "@/locales";

interface ContactFormProps {
  d: TranslationsType;
}

export function ContactForm({ d }: ContactFormProps) {
  const availableServices = [
    { id: "web-design", label: d.contact.serviceWebDesign },
    { id: "ui-ux-design", label: d.contact.serviceUiUx },
    { id: "mobile-apps", label: d.contact.serviceMobileApps },
    { id: "landing-page", label: d.contact.serviceLandingPage },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "ui-ux-design",
  ]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const chosenServicesLabels = availableServices
      .filter((s) => selectedServices.includes(s.id))
      .map((s) => s.label)
      .join(", ");

    const fullMessage = `Budget: ${budget || "Not specified"}\nServices: ${
      chosenServicesLabels || "None"
    }\n\n${message}`;

    try {
      const res = await submitContact({
        name,
        email,
        subject: `Project Inquiry from ${name}`,
        message: fullMessage,
      });

      if (res.success) {
        setSuccessMessage(d.contact.successAlertMessage);
        showAlert.success(
          d.contact.successAlertTitle,
          d.contact.successAlertMessage
        );
        setName("");
        setEmail("");
        setBudget("");
        setMessage("");
      } else {
        const errText = res.message || d.contact.errorAlertTitle;
        setErrorMessage(errText);
        showAlert.error(
          d.contact.errorAlertTitle,
          errText
        );
      }
    } catch {
      setErrorMessage(d.contact.networkErrorMessage);
      showAlert.error(
        d.contact.networkErrorTitle,
        d.contact.networkErrorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card text-card-foreground border border-border rounded-xl p-6 sm:p-7 shadow-xs">
      {successMessage && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2.5">
          <CheckCircle2 className="size-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2.5">
          <AlertCircle className="size-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground"
          >
            {d.contact.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={d.contact.namePlaceholder}
            className="w-full border border-input rounded-lg bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all shadow-xs"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            {d.contact.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={d.contact.emailPlaceholder}
            className="w-full border border-input rounded-lg bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all shadow-xs"
          />
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-foreground"
          >
            {d.contact.budgetLabel}
          </label>
          <input
            type="text"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder={d.contact.budgetPlaceholder}
            className="w-full border border-input rounded-lg bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all shadow-xs"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground"
          >
            {d.contact.messageLabel}
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={d.contact.messagePlaceholder}
            className="w-full border border-input rounded-lg bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all shadow-xs min-h-24 resize-none"
          />
        </div>

        {/* Services Checkboxes */}
        <div className="space-y-4">
          <label className="block text-base font-medium text-foreground">
            {d.contact.servicesLabel}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {availableServices.map((service) => {
              const isChecked = selectedServices.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <div
                    className={`size-6 rounded-[4px] border flex items-center justify-center transition-colors shadow-xs ${
                      isChecked
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-input bg-transparent hover:border-foreground/40"
                    }`}
                  >
                    {isChecked && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {service.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all cursor-pointer shadow-xs disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>{d.contact.sendingBtn}</span>
            </>
          ) : (
            <>
              <span>{d.contact.submitBtn}</span>
              <Send className="size-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
