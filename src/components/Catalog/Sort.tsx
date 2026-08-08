import { useAppContext } from "../context/AppContext";

export default function Sort(props) {

    const{setSort,acs,setAcs} = useAppContext();

    function handleSort(e){
      setSort(e.target.value)
      props.refetch()
    }
    function handleAsc(e){
      setAcs(!acs())
      props.refetch()
    }
  return (
    <>
      
      <fieldset class="fieldset flex flex-row gap-3 bg-red-800 justify-center">
    <legend class="fieldset-legend">Sort By </legend>
  
    <select class="select" onChange={handleSort}>
    <option disabled={true}>Pick a field</option>
    <option value="name">name</option>
    <option value="price">price</option>
    <option value="company">company</option>
  </select>
  <label class="label text-black">
    <input type="checkbox" class="checkbox"onChange={handleAsc} />
    decending
  </label>
</fieldset>


     <br/>
    </>
  );
}
//selectbg- 
//appearance-none
//bg-purple-200
//justify-items-center
//