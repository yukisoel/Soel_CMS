import React from 'react';
import { GoogleService } from "@/main/service/GoogleService";
import { useSelectStoreSingle } from "./useSelectStoreSingle";

type Props = {
    googleService: GoogleService;
};

const SelectStoreSingleRender: React.FC<Props> = ({ googleService }) => {
    const { selectStoreRender } = useSelectStoreSingle({
        googleService,
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
