import React from "react"
import { useFormContext } from "react-hook-form"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { UpdateSettingsInput } from "@shared/settings-schema"
import type { WebhookValues } from "@client/pages/settings/types"
import { SettingsInput } from "@client/pages/settings/components/SettingsInput"

type JobCompleteWebhookSectionProps = {
  values: WebhookValues
  isLoading: boolean
  isSaving: boolean
}

export const JobCompleteWebhookSection: React.FC<JobCompleteWebhookSectionProps> = ({
  values,
  isLoading,
  isSaving,
}) => {
  const { default: defaultJobCompleteWebhookUrl, effective: effectiveJobCompleteWebhookUrl } = values
  const { register, formState: { errors } } = useFormContext<UpdateSettingsInput>()

  return (
    <AccordionItem value="job-complete-webhook" className="border rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline py-4">
        <span className="text-base font-semibold">Job Complete Webhook</span>
      </AccordionTrigger>
      <AccordionContent className="pb-4">
        <div className="space-y-4">
          <SettingsInput
            label="Job completion webhook URL"
            inputProps={register("jobCompleteWebhookUrl")}
            placeholder={defaultJobCompleteWebhookUrl || "https://..."}
            disabled={isLoading || isSaving}
            error={errors.jobCompleteWebhookUrl?.message as string | undefined}
            helper={`When set, the server sends a POST when you mark a job as applied (includes the job description). Default: ${defaultJobCompleteWebhookUrl || "—"}.`}
            current={effectiveJobCompleteWebhookUrl || "—"}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
