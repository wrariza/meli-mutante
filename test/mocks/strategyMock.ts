import { NITROGENOUS_MATCHS } from '../../src/domain/enumns/nitrogenousMatchs.enums'
import { NITROGENOUS_NUMBERS } from '../../src/domain/enumns/nitrogenousNumbers.enums'
import { NITROGENOUS_MOVES } from '../../src/domain/enumns/nitrogenousMoves.enums'
import { Strategy, DetectDna } from '../../src/domain/models'

export const strategyMock = (detectDna: DetectDna) => {
  return [
    new Strategy(
      NITROGENOUS_MATCHS.horizontal,
      [NITROGENOUS_NUMBERS.zero, NITROGENOUS_NUMBERS.one],
      NITROGENOUS_MOVES.right,
      NITROGENOUS_MOVES.left,
      NITROGENOUS_NUMBERS.zero,
      detectDna
    ),
    new Strategy(
      NITROGENOUS_MATCHS.vertical,
      [NITROGENOUS_NUMBERS.zero, NITROGENOUS_NUMBERS.two],
      NITROGENOUS_MOVES.down,
      NITROGENOUS_MOVES.up,
      NITROGENOUS_NUMBERS.zero,
      detectDna
    ),
    new Strategy(
      NITROGENOUS_MATCHS.diagonalRight,
      [NITROGENOUS_NUMBERS.zero, NITROGENOUS_NUMBERS.three],
      NITROGENOUS_MOVES.diagonalRight,
      NITROGENOUS_MOVES.diagonalRightReverse,
      NITROGENOUS_NUMBERS.zero,
      detectDna
    ),
    new Strategy(
      NITROGENOUS_MATCHS.diagonalLeft,
      [NITROGENOUS_NUMBERS.one, NITROGENOUS_NUMBERS.two],
      NITROGENOUS_MOVES.diagonalLeft,
      NITROGENOUS_MOVES.diagonalLeftReverse,
      NITROGENOUS_NUMBERS.zero,
      detectDna
    )
  ]
}
