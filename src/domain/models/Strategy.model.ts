import { QUADRANT_MATCHS } from '../enumns/quadrants_matchs'
import { QUADRANTS_NUMBERS } from '../enumns/quadrants_numbers'
import { QUADRANT_MOVES } from '../enumns/quadrant_moves'

export class Strategy {
  name: QUADRANT_MATCHS
  match: QUADRANTS_NUMBERS[]
  moveDone: QUADRANT_MOVES
  moveReversed: QUADRANT_MOVES
  matchLetterPostion: QUADRANTS_NUMBERS
}
