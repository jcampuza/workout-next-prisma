import { LoginForm } from '@/components/LoginForm';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

const Login = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect('/');
  }

  return <LoginForm />;
};

export default Login;
