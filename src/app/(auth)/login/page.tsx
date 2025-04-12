"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { Provider } from "@/components/ui/provider";
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
import Link from "next/link";

export default function Login() {
  return (
    <Provider>
      <Center h="100vh">
        <Fieldset.Root
          size="lg"
          maxW="md"
          border="1px solid #fff"
          p="1rem"
          borderRadius="xl"
        >
          <Stack>
            <Fieldset.Legend fontSize="2rem">
              Bem vindo de volta!
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Seja bem vindo a dev shop!
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Name:</Field.Label>
              <Input name="name" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Email address:</Field.Label>
              <Input name="email" type="email" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Senha:</Field.Label>
              <PasswordInput name="password" />
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
            <Link href="/register">
              <Highlight query="Cadastre-se" styles={{ color: "#00b3b9" }}>
                Cadastre-se
              </Highlight>
            </Link>
          </Text>
        </Fieldset.Root>
      </Center>
    </Provider>
  );
}
