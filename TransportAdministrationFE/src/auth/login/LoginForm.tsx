import { Box } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoginFormSchema from './LoginForm.schema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldWithController from '../../components/text-field-with-controller/TextFieldWithController.tsx';
import { useTranslation } from 'react-i18next';
import LoginFormModel from '../models/LoginFormModel.ts';
import useLogin from '../queries/use-login.ts';
import { LoadingButton } from '@mui/lab';

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

  const onSubmit: SubmitHandler<LoginFormModel> = (formData) => {
    login(formData);
  };

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
          <LoadingButton type="submit" variant="contained" endIcon={<ChevronRight />} loading={isLoginPending}>
            {t('login.title')}
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;
