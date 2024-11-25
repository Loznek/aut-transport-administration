import { Alert, Box } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoginFormSchema from './LoginForm.schema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import LoginFormModel from '../models/LoginFormModel.ts';
import useLogin from '../queries/use-login.ts';
import { LoadingButton } from '@mui/lab';
import { signInWithEmail } from './firebase.ts';
import { useState } from 'react';
import useGetAllDriverList from '../../drivers/queries/use-get-all-driver-list.ts';

const LoginForm = () => {
  const { t } = useTranslation();
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const { control, handleSubmit } = useForm<LoginFormModel>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(LoginFormSchema()),
  });

  const { data, isError } = useGetAllDriverList();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormModel> = async (formData) => {
    try {
      if (isError) {
        setError(t('login.unexpectedError'));
      }
      await signInWithEmail(formData.email, formData.password);
      if (data?.filter((x) => x.name === formData.username).length !== 0 || formData.email === 'admin@admin.com') {
        login(formData);
      }
    } catch (error: unknown) {
      // @ts-expect-error(type is unknown)
      if (error.code === 'auth/invalid-credential') {
        setError(t('login.invalidCredentials'));
      } else {
        setError(t('login.unexpectedError'));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextFieldWithController controllerProps={{ name: 'email', control }} label={t('login.email')} />
        <TextFieldWithController controllerProps={{ name: 'username', control }} label={t('login.username')} />
        <TextFieldWithController
          controllerProps={{ name: 'password', control }}
          slotProps={{ htmlInput: { type: 'password' } }}
          label={t('login.password')}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <LoadingButton type="submit" variant="contained" endIcon={<ChevronRight />} loading={isLoginPending}>
            {t('login.title')}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;
