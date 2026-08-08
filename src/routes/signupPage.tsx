import { A } from '@solidjs/router';
import Counter from '~/components/Counter';
import SignUp from '~/components/SignUp';

export default function signupPage() {
  return (
    <main class="mx-auto mb-auto p-4 text-center">
        Sign up
       <SignUp/>
      
    </main>
  );
}

