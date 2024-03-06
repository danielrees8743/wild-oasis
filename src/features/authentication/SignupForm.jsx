import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignUp } from './useSignUp';
import SpinnerMini from '../../ui/SpinnerMini';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signUp, isLoading } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          disabled={isLoading}
          type='text'
          id='fullName'
          {...register('fullName', { required: 'This is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          disabled={isLoading}
          type='email'
          id='email'
          {...register('email', {
            required: 'This is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}>
        <Input
          disabled={isLoading}
          type='password'
          id='password'
          {...register('password', {
            required: 'This is required',
            minLength: {
              value: 8,
              message: 'Must have a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isLoading}
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This is required',
            validate: (value) =>
              value === getValues().password || 'The passwords do not match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' onClick={reset}>
          Cancel
        </Button>
        <Button>{!isLoading ? 'Create new user' : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
