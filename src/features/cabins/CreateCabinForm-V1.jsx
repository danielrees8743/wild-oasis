import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { createCabin } from '../../services/apiCabins';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin has been created');
      queryClient.invalidateQueries('cabins');
      reset();
    },
    onError: () => {
      toast.error('Cabin could not be created');
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, image: data.image[0] });
    // console.log(data);
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'This field is required' })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label='Maximum Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price must be at least 1',
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            value: 1,
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount price must be less than the regular price',
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', { required: 'This field is required' })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label='Image' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          {...register('image')}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button variation='primary' disabled={isCreating}>
          Edit cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
