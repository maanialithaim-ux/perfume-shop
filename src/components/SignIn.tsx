import { createSignal } from "solid-js";
import { useAppContext } from "./context/AppContext";
import { supabase } from "~/routes/supabase";
import { useNavigate } from "@solidjs/router";


export default function SignIn() {
  const navigate = useNavigate();
  const [status ,setStatus] = createSignal("");
  const [loading ,setLoading] = createSignal(false);
  const {user,setUser} = useAppContext();
  async function  handleSignin(e){
   e.preventDefault();

   setStatus("Sending request ....");
   setLoading(true);

   const FormDAta = new FormData(e.target);
   const Email= FormDAta.get("Email2");
   const Password = FormDAta.get("Password3");
   
  
   if(Email =="" || Password ==""){
    
    setStatus("Please complete the form");
    setLoading(false);
    return
   }
   
   const {data,error} = await supabase.auth.signInWithPassword(
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

   const responce = await supabase
   .from("user")
   .select("*")
   .eq("uid",user_id)
   .single()
   
   if(responce.error){
    setStatus(responce.error.message);
    setLoading(false);
    return
   }
   setUser({uid: user_id, nameV :responce.data.Name ,phoneV :responce.data.Phone, AddressV :responce.data.Address , emailV :Email});

   setLoading(false);
   setStatus(" Sign in successfully ");

   e.target.reset();
   navigate("/")
   }
  }
  return (

    <>
    <form onSubmit={handleSignin}>
     <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend class="fieldset-legend">Login</legend>

  <label class="label">Email</label>
  <input name="Email2" type="email" class="input" placeholder="Email" />

  <label class="label">Password</label>
  <input name="Password3"type="password" class="input" placeholder="Password" />

  <button type="submit"class="btn btn-neutral mt-4">Login</button>
</fieldset>
  {status()}
  </form>
    </>
  );
}
