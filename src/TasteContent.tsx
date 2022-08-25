import React, { Dispatch, useState } from "react";
import styled from "styled-components";
//@ts-ignore
import { CSSGrid, layout } from "react-stonecutter";
import { Card, Grid, Input, Text } from "@nextui-org/react";
import { useFoodSearch } from "./hooks";
const ContentWrapper = styled.div`
    height: 100%;
    width: 100%;

    font-family: "Inter";
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    height: 60px;
    width: 100%;
`;
const FoodGrid = styled.div`
    flex-grow: 1;

    width: 100%;
`;
type TCProps = {
    controller: any;
};
export const TasteContent = ({ controller }: TCProps) => {
    const { MenuController } = controller.getControllers();
    const foods: FoodObject[] = MenuController.getAllFoods();

    const [setQuery, filteredFoods] = useFoodSearch(foods);

    const foodCards = filteredFoods.map((food: FoodObject) => {
        return (
            <div key={food.id}>
                <FoodCard foodObject={food} />
            </div>
        );
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    return (
        <ContentWrapper>
            <Header>
                <Input
                    size="xl"
                    placeholder="Food Name"
                    labelLeft="🔎"
                    aria-label="Food name"
                    onChange={handleChange}
                ></Input>
            </Header>

            <FoodGrid>
                <CSSGrid
                    component="div"
                    columns={2}
                    columnWidth={240}
                    itemHeight={80}
                    gutterWidth={5}
                    gutterHeight={5}
                    layout={layout.simple}
                    duration={150}
                    easing="ease-out"
                >
                    {foodCards}
                </CSSGrid>
            </FoodGrid>
        </ContentWrapper>
    );
};

export type FoodObject = {
    id: number;
    name: string;
    type: string;
    tier: number;
    carb: number;
    pro: number;
    fat: number;
    vit: number;
    cal: number;
    weight: number;
    price: number;
};

type IFCProps = {
    foodObject: FoodObject;
};
const FoodCard = ({ foodObject }: IFCProps) => {
    return (
        <Card
            css={{ p: "$6", mw: "240px", height: "80px", display: "flex", flexDirection: "row", alignItems: "center" }}
        >
            <Card.Header>
                <img
                    alt="food logo"
                    src={`public/img/${foodObject.id}.png`}
                    width="50px"
                    height="50px"
                />
                <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={12}>
                        <Text
                            h3
                            css={{ lineHeight: "$xs" }}
                        >
                            {foodObject.name}
                        </Text>
                    </Grid>
                    <Grid xs={12}>
                        <Text css={{ color: "$accents8" }}>{foodObject.type}</Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: "$2" }}></Card.Body>
        </Card>
    );
};

/*
const FoodCard = ({ foodObject }: FoodCardProps) => {
    return (
        <FCWrapper>
            <FoodImg imgPath={`./img/${foodObject.id}.png`} />

            <FoodDetails>
                <FoodTitle>
                    <Text h3>{foodObject.name}</Text>
                </FoodTitle>
                <Divider />
                <FoodBadges>
                    <span style={{ color: "black", fontSize: "12px" }}>Tier {foodObject.tier}</span>
                </FoodBadges>
            </FoodDetails>
        </FCWrapper>
    );
};
*/
