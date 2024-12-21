import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./utils/auth/AuthContext"; // Importing the routes component

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes /> {/* Ensure AppRoutes is inside AuthProvider */}
    </AuthProvider>
  );
};

export default App;
