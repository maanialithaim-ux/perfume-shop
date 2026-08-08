import { A } from '@solidjs/router';
import Counter from '~/components/Counter';
import SignIn from "~/components/SignIn";

export default function signinPage() {
  return (
    <main class="mx-auto mb-auto p-4 text-center">
      <SignIn/>
      <p>if you dont have an account,<a href= "\signupPage" class="link link-accent">Sign Up</a> here</p>
    </main>
  );
}
