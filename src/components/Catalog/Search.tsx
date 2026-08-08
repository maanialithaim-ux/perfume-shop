import { useAppContext } from "../context/AppContext";

export default function Search(props) {

  const {search,setSearch} = useAppContext()

  function handleSearch(e){
    setSearch(e.target.value)
  }

  return (
    <>
      <label class="input">
       <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
       <g
         fill="none"
         stroke="currentColor"
       >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
       </g>
      </svg>
      <input type="search" required placeholder="Search .." onInput={handleSearch} />
      <button class="btn" onClick={ () => props.refetch()}>Search</button>
     </label>
    <br/><br/>
    </>
  );
}
