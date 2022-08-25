import { Modal, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { TasteModal } from "./TasteModal";

type ITBProps = {
    controller: any;
};
export const TasteButton = ({ controller }: ITBProps) => {
    const [active, setActive] = useState(false);

    return (
        <div>
            <Modal
                open={active}
                onClose={() => {
                    setActive(false);
                    setBlurred(false);
                }}
                width="540px"
                css={{ background: "rgb(90 16 16 / 66%)" }}
                noPadding
            >
                <Modal.Header>
                    <Text
                        h1
                        color="white"
                        style={{ fontSize: "34px" }}
                    >
                        Modify Taste Preference
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <TasteModal controller={controller} />
                </Modal.Body>
            </Modal>
            <div
                className={`footer__button taste__button ${active ? "clicked" : ""}`}
                onClick={() => {
                    setActive((clicked) => !clicked);
                    setBlurred(true);
                }}
            >
                <div className="trophy__icon">
                    <i className="ion-heart"></i>
                </div>
            </div>
        </div>
    );
};

const setBlurred = (blur: boolean) => {
    const nodes = [
        document.querySelector(".top"),
        document.querySelector(".calculate"),
        document.querySelector(".info__container"),
        document.querySelector(".content"),
    ];

    for (const node of nodes) {
        blur ? node.classList.add("blurred") : node.classList.remove("blurred");
    }
};
