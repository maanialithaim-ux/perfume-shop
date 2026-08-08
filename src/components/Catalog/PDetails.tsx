import { createResource, For, Match, Switch } from "solid-js";
import { useAppContext } from "../context/AppContext";
import AddButton from "../Cart/AddButton";
import { supabase } from "~/routes/supabase";
import ProductList from "./ProductList";

export default function PDetails() {


  const {pid,setPid,user} =useAppContext();
  const [data] = createResource(async () =>{
  
    const responce = await supabase
    .from("product")
    .select("*")
    .eq("pid",pid())
    .single()

    return responce.data;
  });
  
  
  return (
    <>
   


<ul class="list bg-base-100 rounded-box shadow-md">
  
  <li class="p-4 pb-2 text-xs opacity-60 tracking-wide"><div class="hover-3d">
 
  <figure class="w-60 rounded-2xl">
  <img src={"https://pvpvyedwnezojrpinmnh.supabase.co/storage/v1/object/public/perfumes/" + data()?.image} alt="Tailwind CSS 3D card" />
  </figure>
 
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div></li>
  
  <li class="list-row">
    
    <div>
      <div>{data()?.company}</div>
      <div class="text-xs uppercase font-semibold opacity-60">{data()?.name}</div>
    </div>
    

    <p class="list-col-wrap text-xs"> {data()?.details}</p>

    <br/>
    <p> Price {data()?.price }KD</p>
    <br/><br/>
    
    
  </li>
  <Switch fallback={<p> please signin to add to cart </p>}>
    <Match when={user()}>
    <AddButton/>
    </Match>
  </Switch>
</ul>
<button class="btn btn-soft btn-error"onClick={()=>setPid(null)}>Back</button>
    </>
   
  );
 
}

/*
<div class="card bg-base-100 w-96 shadow-sm">
  <div class="card-body">
    <h2 class="card-title">Company</h2>
    <div class="stat-value">{data()?.company}</div>
   <p class="card-title">Details</p>
   <div class="stat-value">{data()?.details}</div>
   <div class="stat-title">Price</div>
   <div class="stat-value">{data()?.price }KD</div>

    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>

</div>
*/


//<AddButton PQuantity={data().quantity}/>





/*<div class="card bg-base-100 w-96 shadow-sm">
  <figure class="px-10 pt-10">
    <img
      src={"https://pvpvyedwnezojrpinmnh.supabase.co/storage/v1/object/public/perfumes/" + item.image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  */