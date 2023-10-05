import './App.css';
import Chat from './components/Chat';
import { ThemeProvider } from '@emotion/react';
import { Gruvbox } from './themes/Gruvbox';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Gruvbox}>
        <header className="App-header">
          <Chat />
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
