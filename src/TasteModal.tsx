import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { TasteContent } from "./TasteContent";

const Backdrop = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;

    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    filter: blur(0px);
`;

const TasteWrapper = styled.div`
    background: hsla(41, 93%, 54%, 1);

    height: 350px;
    background: linear-gradient(45deg, hsla(41, 93%, 54%, 1) 59%, hsla(49, 34%, 79%, 1) 100%);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-radius: 15px;
    padding: 10px;
    z-index: 9999;
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
