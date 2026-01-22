import React from "react"
import { useFormContext } from "react-hook-form"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { UpdateSettingsInput } from "@shared/settings-schema"
import type { WebhookValues } from "@client/pages/settings/types"
import { SettingsInput } from "@client/pages/settings/components/SettingsInput"

type PipelineWebhookSectionProps = {
  values: WebhookValues
  isLoading: boolean
  isSaving: boolean
}

export const PipelineWebhookSection: React.FC<PipelineWebhookSectionProps> = ({
  values,
  isLoading,
  isSaving,
}) => {
  const { default: defaultPipelineWebhookUrl, effective: effectivePipelineWebhookUrl } = values
  const { register, formState: { errors } } = useFormContext<UpdateSettingsInput>()

  return (
    <AccordionItem value="pipeline-webhook" className="border rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline py-4">
        <span className="text-base font-semibold">Pipeline Webhook</span>
      </AccordionTrigger>
      <AccordionContent className="pb-4">
        <div className="space-y-4">
          <SettingsInput
            label="Pipeline status webhook URL"
            inputProps={register("pipelineWebhookUrl")}
            placeholder={defaultPipelineWebhookUrl || "https://..."}
            disabled={isLoading || isSaving}
            error={errors.pipelineWebhookUrl?.message as string | undefined}
            helper={`When set, the server sends a POST on pipeline completion/failure. Default: ${defaultPipelineWebhookUrl || "—"}.`}
            current={effectivePipelineWebhookUrl || "—"}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
