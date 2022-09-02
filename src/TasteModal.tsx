import React from "react";
import styled from "styled-components";
import { TasteContent } from "./TasteContent";

const TasteWrapper = styled.div`
    background: hsla(41, 93%, 54%, 1);

    height: 350px;
    background: linear-gradient(45deg, hsl(0deg 0% 100% / 62%) 59%, hsla(49, 34%, 79%, 1) 100%);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-radius: 15px;
    padding: 10px;
    z-index: 889;
`;

type ITMProps = {
    controller: any;
};
export const TasteModal = ({ controller }: ITMProps) => {
    return (
        <TasteWrapper>
            <TasteContent controller={controller} />
        </TasteWrapper>
    );
};
