import { Box, Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoginFormSchema, { LoginFormModel } from './LoginForm.schema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../../components/text-field-with-controller/TextFieldWithController.tsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../useAuth.ts';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { control, handleSubmit } = useForm<LoginFormModel>({
    resolver: yupResolver(LoginFormSchema()),
  });

  const onSubmit = useCallback<SubmitHandler<LoginFormModel>>(
    (formData) => {
      console.log(formData);
      auth.login(formData);
    },
    [auth]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextFieldWithController controllerProps={{ name: 'username', control }} label={t('login.username')} />
        <TextFieldWithController
          controllerProps={{ name: 'password', control }}
          slotProps={{ htmlInput: { type: 'password' } }}
          label={t('login.password')}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button type="submit" variant="contained" endIcon={<ChevronRight />}>
            {t('login.title')}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;
