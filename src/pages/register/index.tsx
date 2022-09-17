import React from "react";
import { Box, Button, Heading, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

import InputField from "@/components/common/InputField";
import { useRegisterUserMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/functions/toErrorMap";
import { validateForm } from "@/pages/register/validate";

const RegisterPage = () => {
  const [, registerUser] = useRegisterUserMutation();
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <Box w="40%" p={4} margin="auto" h="100vh">
      <Heading color="green.500" mb={4}>
        Register
      </Heading>
      <Formik
        validationSchema={validateForm}
        initialValues={{ username: "", password: "", rePassword: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const user = await registerUser(values);
          setSubmitting(false);
          if (user.data?.registerUser.errors) {
            setErrors(toErrorMap(user.data.registerUser.errors));
            return;
          }
          router.push("/");
        }}
      >
        {(props) => {
          const {
            values: { username, password, rePassword },
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
              <InputField
                name="rePassword"
                type="password"
                label="Re-password"
                placeholder="Enter Re-password"
                value={rePassword}
              />
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                disabled={!isValid}
              >
                Register
              </Button>
              <Link onClick={redirectToLogin} p={4} ml={10}>
                You have an account!
              </Link>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default RegisterPage;
