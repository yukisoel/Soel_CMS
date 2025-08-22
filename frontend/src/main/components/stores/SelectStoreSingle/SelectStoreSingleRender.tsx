import React from 'react';
import { useSelectStoreSingle } from "./useSelectStoreSingle";


const SelectStoreSingleRender: React.FC = () => {
    const { selectStoreRender } = useSelectStoreSingle({
        onNextClick: () => {
            console.log("Next button clicked");
        },
        onBackClick: () => {
            console.log("Back button clicked");
        }
    });

    return (
        <div>
            {selectStoreRender()}
        </div>
    );
};

export default SelectStoreSingleRender;
