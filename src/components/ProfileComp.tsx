import { createSignal } from "solid-js";
import { useAppContext } from "./context/AppContext";
import { supabase } from "~/routes/supabase";

export default function ProfileComp() {
  const [status ,setStatus] = createSignal("");
  const [loading ,setLoading] = createSignal(false);
  const {user,setUser} = useAppContext();

  async function handleUpdate(e){
   
    e.preventDefault();

    setStatus("Sending request ....");
    setLoading(true);
 
    const FormDAta = new FormData(e.target);
    const Name = FormDAta.get("Name1");
    const Email= FormDAta.get("Email2");
    const Password = FormDAta.get("Password3");
    const Phone= FormDAta.get("Phone5");
    const Address= FormDAta.get("Address6");
    
    if(Name =="" || Email =="" || Phone =="" || Address ==""){
      setStatus("Please complete the form");
      setLoading(false);
      return
     }

     if(Password !=""){
      const {data,error}= await supabase.auth.updateUser(
      {
        password: Password,
      }
      )
      if(error){
        setStatus(error.message);
        setLoading(false);
        return
       }
      
     const response = await supabase
     .from("user")
     .insert({nameV : Name ,phoneV : Phone, AddressV : Address })
     .eq("uid" , user()?.uid)

     if(response.error){
      setStatus(response.error.message);
      setLoading(false);
      return
     }
     setUser({uid:user()?.uid, nameV : Name ,phoneV : Phone, AddressV : Address , emailV :Email});

     setStatus("Finished Updating");
     setLoading(false);
    }
  }
  return (
    <>
    <form onSubmit={ handleUpdate }>
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

  <legend class="fieldset-legend">Prpfile</legend>
 
  <label class="label">Name</label>
  <input name="Name1" type="text"  class="input input-error" value={user()?.nameV }/>
  
  <label class="label">Password</label>
  <input name="Password3" type="password"  class="input input-secondary"/>

  <label class="label">Phone</label> 
  <input name="Phone5"type="text" class="input input-info" value={user()?.phoneV}/>

  <label class="label">Address</label>
  <input name="Address6"type="text" class="input input-success"value={user()?.AddressV} />


<button type = "submit" class="btn btn-outline btn-secondary" disabled={loading()} >Update Profile</button>
</fieldset>
</form>
    
    {status()}
    </>
  );
}
