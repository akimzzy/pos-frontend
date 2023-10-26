<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

defineProps<{ signup: boolean }>();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});
type Schema = z.output<typeof schema>;

const state = ref<{
  email: string | undefined;
  password: string | undefined;
  passwordType: "password" | "text";
  closeNotification: boolean;
}>({
  email: undefined,
  password: undefined,
  passwordType: "password",
  closeNotification: true,
});
const toast = useToast();
async function submit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  toast.add({ title: "Passord Incorrect", timeout: 0 });
  console.log(event.data);
}
</script>

<template>
  <div class="max-w-xs flex-col m-auto h-screen flex justify-center gap-14">
    <h2
      class="font-semibold text-3xl text-gray-900 dark:text-white leading-tight"
    >
      {{ signup ? "Signup" : "Login" }}
    </h2>
    <div class="w-full">
      <UNotification
        v-if="state.closeNotification"
        :close-button="{ size: '2xs' }"
        class="mb-6"
        title="Incorrect email or password"
        @close="() => (state.closeNotification = false)"
        :id="1"
        :timeout="0"
      />
      <UForm
        class="w-full space-y-4 rounded-lg"
        :schema="schema"
        :state="state"
        @submit="submit"
      >
        <UFormGroup label="Email" name="email">
          <UInput
            size="md"
            placeholder="email address"
            icon="i-heroicons-envelope"
            v-model="state.email"
            type="email"
            autofocus
          >
          </UInput>
        </UFormGroup>
        <UFormGroup
          :label="signup ? 'Create password' : 'Password'"
          name="password"
        >
          <UInput
            icon="i-heroicons-lock-closed"
            size="md"
            v-model="state.password"
            :type="state.passwordType"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                v-show="state.password"
                color="gray"
                variant="link"
                :icon="
                  state.passwordType === 'password'
                    ? 'i-heroicons-eye'
                    : 'i-heroicons-eye-slash'
                "
                :padded="false"
                @click="
                  () => {
                    state.passwordType =
                      state.passwordType === 'password' ? 'text' : 'password';
                  }
                "
              />
            </template>
          </UInput>
        </UFormGroup>
        <UButton type="submit"> Submit </UButton>
      </UForm>
    </div>
  </div>
</template>
