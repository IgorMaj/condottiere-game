import { MERCENARY_TYPE } from "../../../utils/constants";
import { createMercenary1 } from "../../cards/mercenaries/Mercenary1";
import { createScarecrow } from "../../cards/powers/Scarecrow";
import { GameContext } from "../../entity";
import { initGameData } from "../game";
import { discardHand, pass, playCard, scarecrow } from "./battle";

describe("Battle Moves Test Suite", () => {
  test("Pass test", () => {
    const state = initGameData(2);
    const mockedCtx = {
      currentPlayer: "0",
    } as GameContext;
    const mockedEndTurn = jest.fn(() => {
      console.log("Mocked end turn called");
    });
    const mockedEvents = { endTurn: mockedEndTurn };
    pass({ G: state, ctx: mockedCtx, events: mockedEvents });
    expect(state.players["0"].passed).toBeTruthy();
    expect(mockedEndTurn).toBeCalled();
  });

  test("Discard Hand test", () => {
    const state = initGameData(2);
    const mockedCtx = {
      currentPlayer: "0",
    } as GameContext;
    const mockedEndTurn = jest.fn(() => {
      console.log("Mocked end turn called");
    });
    const mockedEvents = { endTurn: mockedEndTurn };
    discardHand({ G: state, ctx: mockedCtx, events: mockedEvents });
    expect(mockedEndTurn).not.toBeCalled();

    state.players[0].hand = state.players[0].hand.filter(
      (c) => c.type !== MERCENARY_TYPE
    );
    discardHand({ G: state, ctx: mockedCtx, events: mockedEvents });
    expect(mockedEndTurn).toBeCalled();
  });

  test("Play Card Standard test", () => {
    const state = initGameData(2);
    const mockedCtx = {
      currentPlayer: "0",
    } as GameContext;
    const mockedEndTurn = jest.fn(() => {
      console.log("Mocked end turn called");
    });
    const mockedEvents = { endTurn: mockedEndTurn };
    state.players["0"].hand = [createMercenary1()];
    playCard(
      { G: state, ctx: mockedCtx, events: mockedEvents },
      state.players["0"].hand[0].id
    );
    expect(mockedEndTurn).toBeCalled();
    expect(state.players["0"].hand.length).toBe(0);
  });

  test("Scarecrow play test", () => {
    const state = initGameData(2);
    const mockedCtx = {
      currentPlayer: "0",
    } as GameContext;
    const mockedEndTurn = jest.fn(() => {
      console.log("Mocked end turn called");
    });
    const mockedEvents = { endTurn: mockedEndTurn };

    state.players["0"].hand = [createScarecrow()];
    state.players["0"].battleLine = [createMercenary1()];

    const scarecrowId = state.players["0"].hand[0].id;
    const mercenaryId = state.players["0"].battleLine[0].id;
    playCard({ G: state, ctx: mockedCtx, events: mockedEvents }, scarecrowId);
    // since it's a scarecrow
    expect(mockedEndTurn).not.toBeCalled();
    expect(state.players["0"].hand.length).toBe(0);

    scarecrow(
      { G: state, ctx: mockedCtx, events: mockedEvents },
      scarecrowId,
      mercenaryId
    );
    expect(mockedEndTurn).toBeCalled();
    expect(state.players["0"].hand.length).toBe(1);
  });
});
