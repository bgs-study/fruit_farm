import { useState, useEffect } from 'react';

const UpdatePeriod = ({timeTable,target,LiftingDate}) =>{
    const [updateDate, setUpdateDate] = useState("");

    useEffect(() => {
        setUpdateDate(timeTable.filter(table => table.id === target)[0].date);
    },[timeTable]);

    useEffect(() => {
        LiftingDate(updateDate);
    },[updateDate])

    return (
            <div> 
                <input type="date" value={updateDate} min="" onChange={e => setUpdateDate(e.target.value)}/>
            </div>
    );
}

export default UpdatePeriod;