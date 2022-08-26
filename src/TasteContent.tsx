import React, { Dispatch, useState } from "react";
import styled from "styled-components";
//@ts-ignore
import { CSSGrid, layout } from "react-stonecutter";
import { Card, Dropdown, Grid, Input, Text } from "@nextui-org/react";
import { useFoodSearch } from "./hooks";
import { FoodObject } from "./types";
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

const FoodCardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
type IFCProps = {
    foodObject: FoodObject;
};
const FoodCard = ({ foodObject }: IFCProps) => {
    const TASTE_DESCRIPTIONS = ["Worst, Horrible, Bad, Ok, Good, Delicious, Favorite"];
    const TASTE_MULTS = [0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3];
    return (
        <FoodCardWrapper>
            <Card
                css={{
                    p: "$6",
                    w: "220px",
                    h: "70px",
                    display: "flex",
                    flexDirection: "row",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            >
                <Card.Header css={{ padding: "0px" }}>
                    <img
                        alt="food logo"
                        src={`public/img/${foodObject.id}.png`}
                        width="50px"
                        height="50px"
                        style={{ marginLeft: "3px" }}
                    />
                    <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                            <Text
                                h4
                                css={{ lineHeight: "$xs" }}
                            >
                                {foodObject.name}
                            </Text>
                        </Grid>
                        <Grid xs={12}>
                            <Text css={{ fontWeight: "$light", color: "$accents8" }}>{foodObject.type}</Text>
                        </Grid>
                    </Grid.Container>
                </Card.Header>
            </Card>
            <Dropdown closeOnSelect>
                <Dropdown.Button
                    flat
                    css={{ width: "20px", height: "70px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    color="success"
                />
                <Dropdown.Menu>
                    <Dropdown.Item key="testts">Testing</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </FoodCardWrapper>
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
