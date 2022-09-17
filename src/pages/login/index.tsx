import React from "react";
import { Box, Button, Heading, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

import InputField from "@/components/common/InputField";
import { useLoginMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/functions/toErrorMap";
import { validateForm } from "@/pages/login/validate";

const LoginPage = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  const redirectToRegister = () => {
    router.push("/register");
  };

  return (
    <Box w="40%" p={4} margin="auto" h="100vh">
      <Heading color="green.500" mb={4}>
        Login
      </Heading>
      <Formik
        validationSchema={validateForm}
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const user = await login(values);
          setSubmitting(false);
          if (user.data?.login.errors) {
            setErrors(toErrorMap(user.data.login.errors));
            return;
          }
          router.push("/");
        }}
      >
        {(props) => {
          const {
            values: { username, password },
            isValid,
            isSubmitting,
          } = props;
          return (
            <Form>
              <InputField
                name="username"
                type="text"
                label="Username"
                placeholder="Enter Username"
                value={username}
              />
              <InputField
                name="password"
                type="password"
                label="Password"
                placeholder="Enter Password"
                value={password}
              />
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                disabled={!isValid}
              >
                Login
              </Button>
              <Link ml={10} onClick={redirectToRegister}>
                You have no account? Register now!
              </Link>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default LoginPage;
