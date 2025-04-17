import { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { baseURL } from '../utils/api';

interface progressType{
    value: number,
    element: string,
};

interface ElementSpreadProps{
    updateFlag: number
};

const ElementSpread = ({updateFlag}: ElementSpreadProps) => {
    
    const [Progress, SetProgress] = useState<progressType[]>([]);

    const getElementSpread = () => {
        fetch(`${baseURL}team-members/getElementSpread/`)
            .then((response) => response.json())
            .then((data) => {
            SetProgress(data);
            })
            .catch((error) => console.error("Error:", error));
    }
    console.log("Element Spread updateFlag value: " + updateFlag)
    //need to get data from database
    useEffect(() => {
        getElementSpread();
    }, [updateFlag]);

    return (
        <div>
            <div className="relative mb-5 pt-1">
                {Progress.map((p) => (
                // in case of delete, will rerender by calling GetTeamMembers
                <ProgressBar progress={p.value} element={p.element}></ProgressBar>
                ))}
                
            </div>
        </div>
    )
}

export default ElementSpread