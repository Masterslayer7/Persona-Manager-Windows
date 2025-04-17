import { SetStateAction, useEffect, useState } from "react";
import { Combobox, Button } from "@headlessui/react";
import { baseURL } from '../utils/api';

// Type for props
interface SearchBoxProps {
  onAdd: () => void;
}

// type persona for the data read from backend
type Persona = {
  id: number;
  name: string;
  arcana: string;
  level: number;
  skills: {
    [skillName: string]: number;
  };
  resists: string;
};

const SearchBox = ({ onAdd }: SearchBoxProps) => {
  
  const [allPersonas, setallPersonas] = useState<Persona[]>([]); // state of all personas from database
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null); // state of persona selected
  const [query, setQuery] = useState(""); // state of the text input

  console.log("Fetching from:", `${baseURL}personas/`);
  
  //need to get data from database
  useEffect(() => {
    fetch(`${baseURL}personas/`)
      .then((response) => response.json())
      .then((data) => {
        setallPersonas(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  
  //Console logs selected persona on change
  useEffect(() => { 
    console.log(selectedPersona);
  }, [selectedPersona]); 

  // Handles the call to backend after Add button is clicked
  function handleAddButtonClick() {
    fetch(`${baseURL}team-members/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: selectedPersona?.name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add persona");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Added successfully", data);
        onAdd(); //Calles the parent components onAdd function to rerender the PersonaItems
      })
      .catch((error) => {
        console.error(error);
      });
  }


  //Filters the persona using query, List of options shown
  const filteredPersona =
    query === ""
      ? allPersonas
      : allPersonas.filter((allPersonas) => {
          return allPersonas.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedPersona} onChange={setSelectedPersona} by="id">
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Pick a Persona
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          displayValue={(persona: Persona) => persona?.name ?? ""}
          onChange={(event: { target: { value: SetStateAction<string>; }; }) => setQuery(event.target.value)}
          aria-label="Persona"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          {/* You can include an icon here */}
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z"
            />
          </svg>
        </Combobox.Button>
        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredPersona.length === 0 ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              No results found
            </div>
          ) : (
            filteredPersona.map((persona) => (
              <Combobox.Option
                key={persona.id}
                value={persona}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {persona.name}
                    </span>
                    {selected && (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-blue-600" : "text-blue-600"
                        }`}
                      >
                        {/* Check icon */}
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
      <Button
        onClick={handleAddButtonClick}
        className="inline-flex items-right mt-1 gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Add
      </Button>
    </Combobox>
  );
};

export default SearchBox;
