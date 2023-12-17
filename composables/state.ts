type User = {
  id: string;
  email: string;
};

export const useUser = () => useState<User | null>("user", () => null);

export async function fetchAuthUser() {
  const user = useUser();

  const query = gql`
    query user {
      user {
        id
        email
      }
    }
  `;

  const { data, error } = await useAsyncQuery<{ user: User }>(query);

  if (error.value) {
    user.value = null;
  }

  if (data.value) {
    user.value = data.value.user;
  }
}
