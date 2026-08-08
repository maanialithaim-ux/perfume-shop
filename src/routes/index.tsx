import { A } from '@solidjs/router';
import { createSignal, Match, Switch } from 'solid-js';
import PDetails from '~/components/Catalog/PDetails';
import ProductList from '~/components/Catalog/ProductList';
import { useAppContext } from '~/components/context/AppContext';
import Counter from '~/components/Counter';

export default function Home() {
  
  const [status,setStatus]= createSignal("");
  const {pid} = useAppContext();

  return (
    <main class="mx-auto mb-auto p-4 text-center">
      <Switch fallback={<p>Unknown status</p>}>
    <Match when={ ! pid()}>

        <ProductList/>

    </Match>
    
    <Match when={ pid()}>

         <PDetails/>

    </Match>
  </Switch>

    </main>
  );
}
