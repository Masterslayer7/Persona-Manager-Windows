import { useCallback, useEffect, useState } from "react";
import PersonaItem from "./PersonaItem";
import SearchBox from "./SearchBox";
import { baseURL } from '../utils/api';

interface PersonaListProps {
  onUpdate: () => void;
}

const PersonaList = ({onUpdate}: PersonaListProps) => {
  
  //Create state for list of persona names in current team
  const [personas, setPersonas] = useState<string[]>([]);

  //Gets the names of persona in current team, uses callback to memoize the function, only re-renders if there is change. 
  const GetTeamMembers = useCallback(() => {
    fetch(`${baseURL}team-members/`) 
      .then((response) => response.json())
      .then((data) => {
        setPersonas(data); 
        onUpdate();
      })
      .catch((error) => console.error("Error:", error)); 
  }, [baseURL]); // useCallback depends on everything used inside the callback, typescript and react dont know that baseURL is 

  // code that runs when component loads OR dependency changes
  useEffect(() => { 
    GetTeamMembers(); 
  }, [GetTeamMembers]); // <- dependency

  return (
    <>
      <ul className="mt-4 space-y-2">
        {/* gives the PersonaItem component the name after getting it from the backend */}
        {personas.map((p) => (
          // in case of delete, will rerender by calling GetTeamMembers
          <PersonaItem name={p} onDelete={GetTeamMembers}></PersonaItem>
        ))}

        <li className="p-3 bg-gradient-to-r from-[#ffffff] to-[#b2b2b8] rounded-lg shadow-sm hover:bg-[#51eefc] transition">
          <div>
            <SearchBox onAdd={GetTeamMembers} />
          </div>
        </li>
      </ul>
    </>
  );
};

export default PersonaList;
