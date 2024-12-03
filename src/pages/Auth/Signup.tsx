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
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import validation from "../../utils/validation";
import { useMutation } from "@tanstack/react-query";
import { notify } from "../../utils/helpers/toaster.helper";
import { registerUser } from "../../api/adapters/auth";
import { path } from "../../navigation/CommonPaths";

type SignUpFormValues = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();

  const { mutate: signUpMutation } = useMutation({
    mutationFn: (data: {
      email: string;
      userName: string;
      password: string;
      confirmPassword: string;
    }) => registerUser(data),
    onSuccess: (data) => {
      notify("success", data?.message);
      navigate(path.login);
    },
    onError: (error: { message?: string }) => {
      notify("error", error?.message || "An unknown error occurred");
    },
  });

  const {
    register: signUp,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormValues>();

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: theme.fontFamily, fontWeight: 700 })}
      >
        Create Your Account
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
            {...signUp("email", {
              required: "Email is required",
              validate: (value: string) => {
                return validation.fieldIsEmail(value, "Email", "email");
              },
            })}
          />
          <TextInput
            label="User Name"
            placeholder="User Name"
            required
            styles={{
              label: { color: "#1B2541", fontWeight: "bold" },
              input: { borderRadius: "1rem" },
            }}
            error={errors.email?.message}
            {...signUp("userName", {
              required: "User Name is required",
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
            {...signUp("password", {
              required: "Password is required",
              validate: (value) => {
                return validation.isValidPassword(
                  value,
                  "Password",
                  "password"
                );
              },
            })}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            styles={{
              label: { color: "#1B2541", fontWeight: "bold" },
              input: { borderRadius: "1rem" },
            }}
            error={errors.confirmPassword?.message}
            {...signUp("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) => {
                return (
                  value === getValues("password") || "Password does not Match"
                );
              },
            })}
          />
          <Button
            fullWidth
            mt="xl"
            color="primary"
            radius="md"
            onClick={handleSubmit((data) => {
              signUpMutation(data);
            })}
          >
            Sign Up
          </Button>
          <Text align="center" mt="md">
            Already have an account?{" "}
            <Anchor component={Link} to="/login" weight={700}>
              Log In
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
};

export default SignUp;
