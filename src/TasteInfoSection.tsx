import styled from "styled-components";
import React, { useState } from "react";
import { Badge, Collapse, Text } from "@nextui-org/react";
import { TasteData } from "./TasteStorageController";
import { TASTE_DESCRIPTIONS, TASTE_MULTS, TIER_COLORS } from "./constants";
import { FoodObject } from "./types";
import { useFoodSearch } from "./hooks";

const InfoSectionWrapper = styled.div`
    width: 200px;
    height: 330px;

    padding-left: 10px;
    flex: 1 1 200px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #00000000;
    }

    &::-webkit-scrollbar-thumb {
        background: #e9585884;
        border-radius: 100px;
    }
`;

export const TasteInfoSection = ({
    tasteInfo,
    controller,
    changeInput,
}: {
    tasteInfo: TasteData;
    controller: any;
    changeInput: (query: string) => void;
}) => {
    const handleBadgeClick = (evt: React.MouseEvent) => {
        const clickedFoodName = evt.currentTarget.textContent;
        changeInput(clickedFoodName);
    };
    const { MenuController } = controller.getControllers();
    const allFoods = MenuController.getAllFoods() as FoodObject[];

    const generatedSection = TASTE_DESCRIPTIONS.map((category, i) => {
        const members = allFoods
            .filter((food) => TASTE_MULTS.indexOf(food.tasteMult) === i)
            .map((member) => (
                <Badge
                    key={member.name + category + i}
                    css={{
                        background: TIER_COLORS[Math.floor(member.tier)],
                        cursor: "pointer",
                    }}
                    onClick={handleBadgeClick}
                >
                    {member.name}
                </Badge>
            ));

        return (
            <Collapse
                key={category}
                title={category + ` - ${members.length} Items`}
            >
                {members}
            </Collapse>
        );
    }).reverse();
    //swap "Ok" section -which is index 3-  with bottom
    const okSection = generatedSection.splice(3, 1);
    //@ts-ignore-next
    generatedSection.push(okSection);
    return (
        <InfoSectionWrapper>
            <Collapse.Group
                css={{ width: "100%", height: "100%" }}
                accordion={false}
            >
                {generatedSection}
            </Collapse.Group>
        </InfoSectionWrapper>
    );
};
