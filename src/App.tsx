import React from 'react';
import { User } from '@types';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { IntlProvider, Theme, ThemeProvider } from '@/features';
import './App.css';
import {
  COOKIE_NAMES,
  ROUTES,
  deleteCookie,
  getCookie,
  getLocale,
  getMessages,
  requestUser,
  useStore,
} from './utils';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { MainPage } from './pages/MainPage/MainPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

const AuthRoutes = () => (
  <Routes>
    <Route path={ROUTES.AUTH} element={<LoginPage />} />
    <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
    <Route path='*' element={<Navigate to={ROUTES.AUTH} />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route path={ROUTES.MAIN} element={<MainPage />} />
    <Route path={ROUTES.AUTH} element={<Navigate to={ROUTES.MAIN} />} />
    <Route path={ROUTES.REGISTRATION} element={<Navigate to={ROUTES.MAIN} />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

const App = () => {
  const { service, setStore } = useStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const [messages, setMessages] = React.useState<Record<string, string>>({});
  const locale = getLocale();

  React.useEffect(() => {
    const authCookie = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    const isNotMyDevice = getCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE);

    const deviceExpire =
      isNotMyDevice &&
      new Date().getTime() > new Date(+isNotMyDevice).getTime();
    if (authCookie && deviceExpire) {
      deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
      deleteCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE);
    }

    const preloads: Promise<unknown>[] = [getMessages(locale)];
    if (authCookie && !deviceExpire)
      preloads.push(requestUser({ params: { id: '1' } }));

    Promise.all(preloads).then(([messages, userResponse]) => {
      setMessages(messages as Record<string, string>);
      if (userResponse) {
        const userResponseData = userResponse as ApiResponse<User>;
        if (userResponseData.success) {
          setStore({
            user: userResponseData.data,
            service: { isLogined: true },
          });
        }
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return null;

  const theme = (getCookie(COOKIE_NAMES.THEME) as Theme) ?? 'light';

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>
          {service.isLogined ? <MainRoutes /> : <AuthRoutes />}
        </BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
