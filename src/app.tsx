import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import './app.css';
import Nav from '~/components/Nav';
import Footer from '~/components/Footer';
import { AppProvider } from './components/context/AppContext';

export default function App() {
  return (
    <main class="mx-auto flex flex-col h-screen bg-base-100 text-base-content">
      <Router
        root={(props) => (
          <>
            <AppProvider>
            <Nav />
            <Suspense>{props.children}</Suspense>
            <Footer />
            </AppProvider>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </main>
  );
}
