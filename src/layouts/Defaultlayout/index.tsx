import { ActionIcon, Button, Container, Group } from "@mantine/core";
import { useAppStore } from "../../store/app.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/adapters/auth";
import { notify } from "../../utils/helpers/toaster.helper";
import { clearCookies, removeToken } from "../../utils/helpers/cookies.helpers";
import { useNavigate } from "react-router-dom";
import { path } from "../../navigation/CommonPaths";

const Default = ({ children }: Props) => {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const clearUser = useAppStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      notify("success", data?.message);
      clearUser();
      clearCookies();
      removeToken();
      queryClient.clear();
      navigate(path.login);
    },
    onError: (error: { message?: string }) => {
      notify("error", error?.message || "An unknown error occurred");
      navigate(path.dashboard);
    },
  });

  return (
    <Container>
      <Group position="apart" align="center" mb="md">
        <h1>Welcome, {user?.userName}</h1>
        <Group>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <ActionIcon
            color="red"
            right="-1vh"
            size="lg"
            onClick={() => logoutMutation()}
          >
            Logout
          </ActionIcon>
        </Group>
      </Group>
      {children}
    </Container>
  );
};

type Props = {
  children: React.ReactNode;
};

export default Default;
