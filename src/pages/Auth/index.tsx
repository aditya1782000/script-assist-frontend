import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Stack,
  Text,
  Anchor,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../api/adapters/auth";
import { path } from "../../navigation/CommonPaths";
import { useNavigate, Link } from "react-router-dom";
import { setToken, setUserId } from "../../utils/helpers/cookies.helpers";
import validation from "../../utils/validation";
import { useForm } from "react-hook-form";
import { notify } from "../../utils/helpers/toaster.helper";
import { useAppStore } from "../../store/app.store";

type LoginFormsValue = {
  email: string;
  password: string;
};

const LogIn = () => {
  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  const { mutate: checkCredentials } = useMutation({
    mutationFn: (data: { email: string; password: string }) => userLogin(data),
    onSuccess: (data) => {
      notify("success", data?.message);
      setUser({
        email: data?.data?.email,
        userName: data?.data?.userName,
        id: data?.data?._id,
      });
      setToken(data?.data?.token);
      setUserId(data?.data?._id);
      navigate(path.dashboard);
    },
    onError: (error: { message?: string }) => {
      notify("error", error?.message || "An unknown error occurred");
    },
  });

  const {
    register: signIn,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsValue>();

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: theme.fontFamily, fontWeight: 700 })}
      >
        Welcome Back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack spacing="md">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            styles={{
              label: { color: "#1B2541", fontWeight: "bold" },
              input: { borderRadius: "1rem" },
            }}
            error={errors.email?.message}
            {...signIn("email", {
              required: "Email is required",
              validate: (value: string) => {
                return validation.fieldIsEmail(value, "Email", "email");
              },
            })}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            styles={{
              label: { color: "#1B2541", fontWeight: "bold" },
              input: { borderRadius: "1rem" },
            }}
            error={errors.password?.message}
            {...signIn("password", {
              required: "Password is required",
            })}
          />
          <Button
            fullWidth
            mt="xl"
            color="primary"
            radius="md"
            onClick={handleSubmit((data) => {
              checkCredentials(data);
            })}
          >
            Log In
          </Button>
          <Text align="center" mt="md">
            Don't have an account?{" "}
            <Anchor component={Link} to={path.signup} weight={700}>
              Sign Up
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LogIn;
