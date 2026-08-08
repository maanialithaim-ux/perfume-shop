import { createContext, createSignal, onMount, useContext } from "solid-js";
import { supabase } from "~/routes/supabase";


const AppContext = createContext();
export  function AppProvider(props){

  const [user,setUser] = createSignal(null);
  const [pid,setPid] = createSignal(null);
  const [sort,setSort]= createSignal("pid");
  const [acs,setAcs] = createSignal(true);
  const [search,setSearch] = createSignal("");
  const [cartItems,setCartItems] = createSignal(0);

  const context = {user,setUser,pid,setPid,sort,setSort,acs,setAcs,search,setSearch,cartItems,setCartItems}

  async function checkUser(){
    const {data} = await supabase.auth.getUser();

    if(data.user){
      const responce = await supabase
      .from("user")
      .select("*")
      .eq("uid",data.user.id)
      .single()

      setUser({uid:data.user.id, nameV :responce.data.Name ,phoneV :responce.data.Phone, AddressV :responce.data.Address , emailV :responce.data.Email});
    }
    const cart = await supabase
      .from("user")
      .select("*",{count:"exact"})

      if(cart.data){
        setCartItems(cart.count)
      }

  }
    onMount(checkUser);
   return(

       <AppContext.Provider value={context}>

          {props.children}
       </AppContext.Provider>
   );
}

export function useAppContext(){

  return useContext(AppContext);
}