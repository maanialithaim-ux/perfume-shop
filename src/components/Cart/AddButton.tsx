import { createSignal } from "solid-js";
import { supabase } from "~/routes/supabase";
import { useAppContext } from "../context/AppContext";


export default function AddButton(props) {

  const [count,setCount]= createSignal(1);
  const [status,setStatus]= createSignal("");
  const [loading,setLoading]= createSignal(false);
  const {pid, setCartItems, cartItems} = useAppContext();
   
  function Increase(e){
    setCount(e.target.value);
  }

  async function AddToCart(){
    setLoading(true);

    const responce = await supabase
    .from("cart")
    .insert({pid: pid(), quantity: count()})
     setCartItems( cartItems() +1);
    if (responce.error){
      setStatus(responce.error.message);
    }
    
    setLoading(false);
  }

  return (
    <>
    
    <div class="flex flex-row gap-2">
      <input type="text" placeholder="1" class="input w-15"onInput={Increase} />
      
      <button disabled={loading()} class="btn btn-primary" onClick={AddToCart} > Add to Cart</button>

      
    </div>
    </>
  );
}
/* function changeCount(e){
    setCount(Number(e.target.value));
    setStatus("");
  }
   async function AddToCart(){
    setLoading(true);

    //select
    const responce = await supabase
    .from("caet")
    .select("*")
    .eq("piq" , pid())
    .single()
    //either update or insert
    if(responce.data){
      //update
    const {error} = await supabase
    .from("caet")
    .update({quantity: Math.min(props.PQuantity,responce.data.quantity + count())})
    .eq("{pid", pid())
   }else{
    const {error} = await supabase
    .from("caet")
    .insert([{pid:pid(),quantity:count()},])
    
   }

    setLoading(false);
    setStatus("Done")
  }
  return (
    <>
    
    {status()}
    <div class="flex flex-row gap-2">
      <input type="text" placeholder="1" class="input w-15"value={count()} onInput={changeCount} />
      <button class="h-10 btn-outline btn-error" onClick={AddToCart} disabled={loading()}>Add to Cart</button>
    </div>
*/