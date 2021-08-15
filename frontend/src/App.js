import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import PetLostAndFound from './PetLostAndFound';


function App() {
  return (
    <AuthContextProvider>

      {/*  PetLostAndFound will be the default home page */}
      <PetLostAndFound />

    </AuthContextProvider>
  );
}

export default App;
