"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { Provider } from "@/components/ui/provider";
import { useAuth } from "@/contexts/AuthContext";
import { registerSchema } from "@/schemas/auth.schema";
import { UserFormData } from "@/types/auth";
import {
  Fieldset,
  Stack,
  Field,
  Input,
  Button,
  Center,
  Separator,
  Text,
  Highlight,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Register() {
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = ({ email, password, name }: UserFormData) => {
    registerUser({ email, password, name });
  };

  console.log(errors);

  return (
    <Provider>
      <Center h="100vh" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root
          size="lg"
          maxW="md"
          border="1px solid #fff"
          p="1rem"
          borderRadius="xl"
        >
          <Stack>
            <Fieldset.Legend fontSize="2rem">Bem vindo!</Fieldset.Legend>
            <Fieldset.HelperText>
              Seja bem vindo a dev shop!
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Name:</Field.Label>
              <Input {...register("name")} />
              <Text color="red.500" fontSize="14px">
                {" "}
                {errors.name?.message}{" "}
              </Text>
            </Field.Root>

            <Field.Root>
              <Field.Label>Email address:</Field.Label>
              <Input {...register("email")} />
              <Text color="red.500" fontSize="14px">
                {" "}
                {errors.email?.message}{" "}
              </Text>
            </Field.Root>

            <Field.Root>
              <Field.Label>Senha:</Field.Label>
              <PasswordInput {...register("password")} />
              <Text color="red.500" fontSize="14px">
                {" "}
                {errors.password?.message}{" "}
              </Text>
            </Field.Root>

            <Field.Root>
              <Field.Label>Cornfirmar senha:</Field.Label>
              <PasswordInput {...register("confirmPassword")} />
              <Text color="red.500" fontSize="14px">
                {" "}
                {errors.confirmPassword?.message}{" "}
              </Text>
            </Field.Root>
          </Fieldset.Content>

          <Separator />

          <Button
            type="submit"
            alignSelf="flex-start"
            w="100%"
            mx="auto"
            borderRadius="30px"
          >
            Submit
          </Button>

          <Separator />

          <Text>
            Nâo tem uma conta?{" "}
            <Link href="/login">
              <Highlight query="Entrar" styles={{ color: "#00b3b9" }}>
                Entrar
              </Highlight>
            </Link>
          </Text>
        </Fieldset.Root>
      </Center>
    </Provider>
  );
}
