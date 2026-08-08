import { A } from "@solidjs/router";
import { Match, Switch } from "solid-js";
import { supabase } from "~/routes/supabase";
import { useAppContext } from "./context/AppContext";

export default function SignPage() {
  
  const {user,setUser} = useAppContext();
  
  async function handleSignout(){

 const {error} = await supabase.auth.signOut();

  setUser(null);
  }
  return (
    <>
    <Switch>
        <Match when={ ! user()}>
    <A
            href="/signinPage"
            end={true}
            inactiveClass="border-primary-content/70 hover:border-b-2"
            activeClass="border-primary-content/70 border-b-2"
            class="btn btn-soft"
          >
            
            Sign in
          </A>
    
    </Match>
        <Match when={ user()}>

       <details class=" dropdown bg-orange-800">
       <summary class="btn m-1">{user()?.nameV}</summary>
       <ul class=" menu dropdown-content bg-base-100 rounded-box z-1 w-23 p-2 shadow-sm bg-orange-800">
       <li><a href="\profilePage">Profile</a></li>
       <li><a onclick={handleSignout}>signout</a></li>
       </ul>
     </details>

    </Match>
  </Switch>

    </>
  );
}



/*<div class="dropdown dropdown-end">
     <div tabindex="0" role="button" class="btn m-1">{ user()?.nameV}</div>
    <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-23 p-2 shadow-sm">
    <li><a href="\profilePage">Profile</a></li>
    <li><a onclick={handleSignout}>signout</a></li>
    </ul>
   </div>
*/
/*
<div class="dropdown dropdown-end">
    <div tabIndex={0} role="button" class="btn m-1">{user()?.nameV}</div>
    <ul tabIndex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-23 p-2 shadow-sm">
    <li><a href="\profilePage">Profile</a></li>
    <li><a onclick={handleSignout}>signout</a></li>
    
  </ul>
</div>
*/