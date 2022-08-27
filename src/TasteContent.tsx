import React, { useState } from "react";
import styled from "styled-components";
//@ts-ignore
import { CSSGrid, layout } from "react-stonecutter";
import { Card, Grid, Input, Text, Tooltip } from "@nextui-org/react";
import { useFoodSearch } from "./hooks";
import { FoodObject } from "./types";
import { GrCheckboxSelected } from "react-icons/gr";
import { TasteInfoSection } from "./TasteInfoSection";
import { TasteData } from "./TasteStorageController";
import { TASTE_COLORS, TASTE_DESCRIPTIONS, TASTE_MULTS } from "./constants";
import { IoMdRefresh } from "react-icons/io";
import Swal from "sweetalert2";
const SearchSection = styled.div`
    height: 100%;
    width: 445px;

    font-family: "Inter";
    display: flex;
    flex-direction: column;
    flex: 0 0;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    width: 100%;
`;
const FoodGrid = styled.div`
    flex-grow: 1;

    width: 100%;
`;
const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

type TCProps = {
    controller: any;
};

const StyledRefreshIcon = styled(IoMdRefresh)`
    color: white;
    font-size: 2rem;
    font-weight: 700;
`;
export const TasteContent = ({ controller }: TCProps) => {
    const { MenuController, TasteStorageController } = controller.getControllers();
    const foods: FoodObject[] = MenuController.getAllFoods();

    const [searchInput, setSearchInput] = useState("");
    const [setQuery, filteredFoods] = useFoodSearch(foods);
    const [tasteData, setTasteData] = useState<TasteData>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const tasteChangeHandler = (newTestData: TasteData) => {
        setTasteData(newTestData);
    };

    const changeInput = (query: string) => {
        //react doesn't trigger onChange when input changed with state
        //so need to query the search again
        setSearchInput(query);
        setQuery(query);
    };

    const handleResetButton = () => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "This will reset all your food taste preferences, setting them to default ('Ok').",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Reset",
            confirmButtonColor: "#e95858",
        }).then((result) => {
            if (result.isConfirmed) {
                TasteStorageController.clearTasteData();
                setTasteData({});
            }
        });
    };
    const foodCards = filteredFoods.map((food: FoodObject) => {
        return (
            <div key={food.id}>
                <FoodCard
                    controller={controller}
                    foodObject={food}
                    tasteChangeHandler={tasteChangeHandler}
                />
            </div>
        );
    });
    return (
        <ContentWrapper>
            <SearchSection>
                <Header>
                    <Input
                        size="lg"
                        placeholder="Food Name"
                        labelLeft="🔎"
                        aria-label="Food name"
                        onChange={handleInputChange}
                        width="325px"
                        value={searchInput}
                        id="taste_search_input"
                        css={{
                            flex: "1 1 325px",
                        }}
                    ></Input>
                    <Tooltip
                        key={"reset_taste"}
                        content={"Reset All Taste Preference"}
                        color="error"
                        shadow={true}
                        rounded={false}
                        css={{ zIndex: 9999, fontSize: "18", fontWeight: "900" }}
                    >
                        <Card
                            css={{
                                width: "44px",
                                height: "44px",
                                background: "#f3126047",
                                overflow: "hidden",
                                margin: "0 5px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            isPressable
                            isHoverable
                            onPress={handleResetButton}
                        >
                            <StyledRefreshIcon />
                        </Card>
                    </Tooltip>
                </Header>

                <FoodGrid>
                    <CSSGrid
                        component="div"
                        columns={2}
                        columnWidth={220}
                        itemHeight={70}
                        gutterWidth={5}
                        gutterHeight={5}
                        layout={layout.simple}
                        duration={150}
                        easing="ease-out"
                    >
                        {foodCards}
                    </CSSGrid>
                </FoodGrid>
            </SearchSection>
            <TasteInfoSection
                controller={controller}
                tasteInfo={tasteData}
                changeInput={changeInput}
            />
        </ContentWrapper>
    );
};

const FoodCardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const TasteSelector = styled.div`
    position: absolute;
    width: 220px;
    height: 70px;
    top: 0px;
    left: 0px;
    z-index: 201;

    background: #00000000;
    transition: all 0.1s;

    display: flex;
    flex-direction: row;

    &:hover {
        background: #00000060;
        backdrop-filter: blur(2px);
    }
`;

const TasteOption = styled.div<{ bg: string; active: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;

    height: 100%;
    width: 31.5px;
    background: ${(props) => props.bg || "white"};
    opacity: 0;
    transition: all 0.1s;
    box-shadow: ${(props) => (props.active ? "0px 0px 6px #000000" : "")};
    transform: ${(props) => (props.active ? "scale(1.1)" : "")};
    z-index: ${(props) => (props.active ? "203" : "202")};
    :hover {
        opacity: 100%;
        filter: brightness(120%);
    }

    ${TasteSelector}:hover & {
        opacity: 0.8;
    }
`;

const TasteIndicator = styled.div<{ activeTaste: number }>`
    position: absolute;
    height: 70px;
    width: 10px;
    right: 0;
    top: 0;

    background: ${(props) => TASTE_COLORS[props.activeTaste] || "#0000000"};
`;
const StyledCheckbox = styled(GrCheckboxSelected)`
    width: 20px;
    height: 20px;

    background-clip: text;
    color: white;
`;
type IFCProps = {
    foodObject: FoodObject;
    controller: any;
    tasteChangeHandler: (tasteData: TasteData) => void;
};
const FoodCard = ({ foodObject, controller, tasteChangeHandler }: IFCProps) => {
    const { TasteStorageController } = controller.getControllers();

    const [activeTaste, setActiveTaste] = useState(TASTE_MULTS.indexOf(foodObject.tasteMult) || 3);
    const handleTastinessClick = (evt: React.MouseEvent) => {
        const target = evt.currentTarget;
        const clickedTastinessIndex = [...target.parentElement.children].indexOf(target);
        const clickedTastinessMultiplier = TASTE_MULTS[clickedTastinessIndex];
        //@ts-ignore-next
        const clickedFoodId = parseInt(target.parentElement.attributes["data-food-id"].nodeValue);

        if (isNaN(clickedFoodId) || isNaN(clickedTastinessIndex)) return;
        TasteStorageController.updateFoodTastiness(clickedFoodId, clickedTastinessMultiplier);
        setActiveTaste(clickedTastinessIndex);
        tasteChangeHandler(TasteStorageController.getTasteData());
    };
    const tastinessOptions = TASTE_DESCRIPTIONS.map((desc, i) => {
        const active = i === activeTaste;
        return (
            <Tooltip
                key={desc}
                content={desc}
                rounded
                shadow={true}
                onMouseDown={handleTastinessClick}
                hideArrow
                css={{
                    zIndex: "9999",
                    background: TASTE_COLORS[i],
                    color: "black",
                    fontWeight: 800,
                    fontFamily: "Inter",
                    filter: "brightness(120%)",

                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <TasteOption
                    active={active}
                    bg={TASTE_COLORS[i]}
                    className={(active ? "active" : "") + " taste_option"}
                >
                    {i === activeTaste && <StyledCheckbox />}
                </TasteOption>
            </Tooltip>
        );
    });
    return (
        <FoodCardWrapper>
            <Card
                css={{
                    p: "$6",
                    w: "220px",
                    h: "70px",
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                }}
            >
                <TasteIndicator activeTaste={activeTaste} />
                <TasteSelector data-food-id={foodObject.id}>{tastinessOptions}</TasteSelector>
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
                                css={{ lineHeight: "$xs", fs: "md" }}
                            >
                                {foodObject.name}
                            </Text>
                        </Grid>
                        <Grid xs={12}>
                            <Text css={{ fontWeight: "$light", color: "$accents8", fs: "$sm" }}>{foodObject.type}</Text>
                        </Grid>
                    </Grid.Container>
                </Card.Header>
            </Card>
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
