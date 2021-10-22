import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm'

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;



const SignUp = (props) => {
  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });

 


  const client = useApolloClient();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp);
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      props.history.push('/');
    },
  });

  return (
    <>
    <UserForm action={signUp} formType="signup" />
    {loading && <p>Loading...</p>}
    {error && <p>Error creating account!</p>}
    </>
  );
};

export default SignUp;
