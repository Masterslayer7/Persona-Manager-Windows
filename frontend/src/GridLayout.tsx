import { useState } from "react";
import TeamPanel from "./PersonaList/TeamPanel";
import ContentPanel from "./PersonaContent/ContentPanel";

const GridLayout = () => {
  const [teamUpdateTrigger, setTeamUpdateTrigger] = useState(0);
  
  const triggerTeamUpdate = () => {
    setTeamUpdateTrigger(prev => prev + 1);
  };
  
  return (
    <div>
      {/* Grid */}
      <div id="Grid" className="flex h-screen pb-6 pt-14 px-6 gap-6">
        <TeamPanel onUpdate={triggerTeamUpdate} />
        <ContentPanel updateFlag={teamUpdateTrigger}/>
      </div>
    </div>
  );
};

export default GridLayout;
