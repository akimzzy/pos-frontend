<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

interface Props {
  signup?: boolean;
}
const props = defineProps<Props>();

const baseSchema = {
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Must be at least 8 characters"),
};

const loginSchema = z.object({
  ...baseSchema,
  location: z.string().optional(),
});

const signupSchema = z.object({
  ...baseSchema,
  location: z.string().email("Location is required to signup"),
});

const schema = props.signup ? signupSchema : loginSchema;
type Schema = z.output<typeof schema>;

const state = ref<{
  email: string | undefined;
  location: string | undefined;
  password: string | undefined;
  passwordType: "password" | "text";
  closeNotification: boolean;
}>({
  email: undefined,
  password: undefined,
  passwordType: "password",
  closeNotification: true,
  location: undefined,
});

// const toast = useToast();

const signupQuery = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(createAccountInput: $createAccountInput) {
      accessToken
      user {
        email
        id
      }
    }
  }
`;

const loginQuery = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        email
        id
      }
    }
  }
`;

const { mutate: loginMutaion, loading: loginLoading } = useMutation(loginQuery);
const { mutate: signupMutation, loading: signupLoading } =
  useMutation(signupQuery);
const { onLogin } = useApollo();

async function submit(event: FormSubmitEvent<Schema>) {
  // toast.add({ title: "Passord Incorrect", timeout: 5 });
  try {
    const { email, password, location } = event.data;
    let authData: any = null;

    if (props.signup) {
      authData = await signupMutation({
        createAccountInput: { email, password, location },
      });
    } else {
      authData = await loginMutaion({ email, password });
    }

    await onLogin(authData.data.login.accessToken);
    navigateTo("/");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="max-w-xs flex-col m-auto h-screen flex justify-center gap-10">
    <h2
      class="font-semibold text-3xl text-gray-900 dark:text-white leading-tight"
    >
      {{ signup ? "Signup" : "Login" }}
    </h2>

    <div class="w-full">
      <!-- <UNotification
        v-if="state.closeNotification"
        :close-button="{ size: '2xs' }"
        class="mb-6"
        title="Incorrect email or password"
        @close="() => (state.closeNotification = false)"
        :id="1"
        :timeout="0"
      /> -->
      <UForm
        class="w-full space-y-8 rounded-lg"
        :class="signupLoading || loginLoading ? 'pointer-events-none' : ''"
        :schema="schema"
        :state="state"
        @submit="submit"
      >
        <UFormGroup name="email">
          <template #label>
            <div class="mb-1">Email</div>
          </template>
          <UInput
            size="lg"
            placeholder="email address"
            v-model="state.email"
            type="email"
          />
        </UFormGroup>

        <UFormGroup v-show="signup" name="location">
          <template #label>
            <div class="mb-1">Location</div>
          </template>
          <UTextarea
            v-model="state.location"
            size="lg"
            placeholder="business location"
          />
        </UFormGroup>

        <UFormGroup name="password">
          <template #label>
            <div class="mb-1">
              {{ signup ? "Create password" : "Password" }}
            </div>
          </template>
          <UInput
            placeholder="password"
            size="lg"
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

        <UFormGroup class="flex justify-end">
          <NuxtLink to="/transactions">Transaction</NuxtLink>
          <UButton type="submit"> Submit </UButton>
        </UFormGroup>
      </UForm>
    </div>
  </div>
</template>
