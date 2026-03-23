import Routes from './components/Routes';
import Layout from './components/Layout';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Layout>
        <Navbar />
        <Routes />
      </Layout>
      <h1>App</h1>
    </div>
  );
}

export default App;
