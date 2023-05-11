import { TerritoryStatus } from "../../../utils/constants";
import { initTerritories } from "./init-map";
import { initMapGame } from "./map-game";

describe("Init map test suite", () => {
  test("Territory test", () => {
    const territories = initTerritories();
    expect(territories.length).toBe(17);
    expect(territories.find((t) => !!t.owner)).toBeFalsy();
    expect(
      territories.filter((t) => t.status === TerritoryStatus.FREE).length
    ).toBe(17);
  });

  test("Init map game test", () => {
    const inited = initMapGame();
    expect(inited.ai).toBeTruthy();
    expect(inited.endIf).toBeTruthy();
    expect(inited.turn?.minMoves).toBeTruthy();
    expect(inited.turn?.maxMoves).toBeTruthy();
    expect(inited.turn?.order?.first).toBeTruthy();
    expect(inited.turn?.order?.next).toBeTruthy();
  });
});
