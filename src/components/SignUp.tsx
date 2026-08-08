import { createSignal } from "solid-js";
import { supabase } from "~/routes/supabase";
import { useAppContext } from "./context/AppContext";


export default function SignUp() {
  
  const [status ,setStatus] = createSignal("");
  const [loading ,setLoading] = createSignal(false);
  const {user,setUser} = useAppContext();

  async function HandleSignUp (e){
   e.preventDefault();

   setStatus("Sending request ....");
   setLoading(true);

   const FormDAta = new FormData(e.target);
   const Name = FormDAta.get("Name1");
   const Email= FormDAta.get("Email2");
   const Password = FormDAta.get("Password3");
   const Confirm = FormDAta.get("Confirm4");
   const Phone= FormDAta.get("Phone5");
   const Address= FormDAta.get("Address6");
  
   if(Name =="" || Email =="" || Password =="" || Confirm =="" || Phone =="" || Address ==""){
    
    setStatus("Please complete the form");
    setLoading(false);
    return
   }
   if(Password != Confirm){
   
    setStatus("Please check password");
    setLoading(false);
    return
   }
   
   const {data,error} = await supabase.auth.signUp(
     {
      email: Email,
      password: Password
     }
   );
   if(error){
    setStatus(error.message);
    setLoading(false);
    return
   }else{
   const user_id = data.user?.id;

   await supabase
   .from("user")
   .insert([{nameV : Name ,phoneV : Phone, AddressV : Address , emailV :Email}])
   
  
   
   
   setUser({uid: user_id, nameV : Name ,phoneV : Phone, AddressV : Address , emailV :Email});
   e.target.reset();
   setLoading(false);
   setStatus(" User Account Created ");
   }
  }
   
  return (

    <>
    <form onSubmit={ HandleSignUp}>
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

  <legend class="fieldset-legend">Sign Up</legend>
 
  <label class="label">Name</label>
  <input name="Name1" type="text"  class="input input-error" />
  <label class="label">Email</label>
<input name="Email2" type="email" class="input input-primary" />
<label class="label">Password</label>
<input name="Password3" type="password"  class="input input-secondary" />
<label class="label">Confirm Password</label>
<input name="Confirm4"type="password" class="input input-accent" />
<label class="label">Phone</label>
<input name="Phone5"type="text" class="input input-info" />
<label class="label">Address</label>
<input name="Address6"type="text" class="input input-success" />


<button type = "submit" class="btn btn-outline btn-secondary" disabled={loading()} >Subnit</button>
</fieldset>
</form>
    
    {status()}
    </>
  );
}


