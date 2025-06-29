import { AuthProvider } from './contexts/AuthProvider';
import AppNavigator from './navigation/Routes';

export default function App() {
  return (
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
  );
}
