import PersonaList from "./PersonaList";

interface TeamPanelProps {
  onUpdate: () => void;
}

const TeamPanel = ({onUpdate}: TeamPanelProps ) => {
  return (
    <>
      <section
        id="team_list"
        className="w-1/2 h-full flex flex-col bg-gradient-to-b from-[#6d9ac7] to-[#03054b] shadow-lg rounded-lg p-6 "
      >
        <p className="text-lg font-bold text-white"> Your Persona's</p>

        <PersonaList onUpdate={onUpdate}/>
      </section>
    </>
  );
};

export default TeamPanel;
