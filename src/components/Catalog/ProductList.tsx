import { createResource, For } from "solid-js";
import { supabase } from "~/routes/supabase";
import PDetails from "./PDetails";
import { useAppContext } from "../context/AppContext";
import Sort from "./Sort";
import Search from "./Search";
 

export default function ProductList() {
  const {sort,acs,search} =useAppContext();
  const {pid,setPid} =useAppContext();
  const [ data, {refetch} ] = createResource( async ()=>{
    

    const responce = await supabase
    .from("product")
    .select("*")
    .or("name.ilike.%"+ search() +"%, company.ilike.%"+ search() +"%")
    .order(sort(),{ascending:acs()})
    return responce.data;
  }
  );




  return (
    <>
      <Sort refetch = {refetch} />
      <Search refetch = {refetch} />
      <div class=" flex flex-wrap gap-5 mx-auto justify-center">
      <For each={data()}>
        { (item) =>
          <>
          <div class="card lg:card-side bg-base-80 shadow-sm w-2/6 ">
          <figure>
          <img src={"https://pvpvyedwnezojrpinmnh.supabase.co/storage/v1/object/public/perfumes/" + item.image}
         
           alt="Album"
           class="w-50 h-50 object-cover"/>
         </figure>
         <div class="card-body">
         <h2 class="card-title">{item.name}</h2>
         <p class ="py-6 ">{item.details}</p>
         <p>{item.price} KD </p>
         <div class="card-actions justify-end">
         <button class="btn btn-primary" onclick={() =>setPid(item.pid)}>details</button>
         </div>
        </div>
        </div>
          
          </>
        }
       </For>
       </div>
    </>
  );
}
/*<div class="card lg:card-side bg-base-100 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
      alt="Album" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Listen</button>
    </div>
  </div>
 </div>
 
 

 */