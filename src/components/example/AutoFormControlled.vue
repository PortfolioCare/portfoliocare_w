<script setup lang="ts">
import * as z from "zod";
import { h } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AutoForm } from "@/components/ui/auto-form";

const schema = z.object({
  username: z.string(),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

function onSubmit(values: Record<string, any>) {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
}
</script>

<template>
  <AutoForm class="w-2/3 space-y-6" :schema="schema" :form="form" @submit="onSubmit">
    <Button type="submit"> Submit </Button>
  </AutoForm>
</template>
