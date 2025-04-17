import { baseURL } from '../utils/api';

// Type for Probs
interface PersonaItemsProps {
  name: string;
  onDelete: () => void;
}

const PersonaItem = ({ name, onDelete }: PersonaItemsProps) => {
  
  //Deletes persona from team table in database
  function handleDeleteButtonClick() {
    fetch(`${baseURL}team-members/delete/`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete persona");
        }
        return response.json();
      })
      .then((data) => {
        console.log("deleted successfully", data);
        onDelete(); //calls onDelete prop, which calls rerenders in parent component
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <li className="p-3 bg-gradient-to-r from-[#ffffff] to-[#b2b2b8] rounded-lg shadow-sm hover:bg-[#51eefc] transition">
        {name}
        <button
          type="button"
          className=" w-7 h-auto bg-slate-400 rounded-lg shadow-sm float-right hover:bg-red-500 font-sans text-md font-bold"
          onClick={handleDeleteButtonClick}
        >
          -
        </button>
      </li>
    </>
  );
};

export default PersonaItem;
