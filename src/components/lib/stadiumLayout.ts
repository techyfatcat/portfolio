export const PITCH_LENGTH = 105;
export const PITCH_WIDTH = 68;
export const BOARD_CLEARANCE = 12;

export const TOUCHLINE_MARGIN = 4;

export const GOAL_LINE_X = PITCH_LENGTH / 2 - TOUCHLINE_MARGIN; // 48.5

export const BOARD_Z = 35;
export const BOARD_X = 54;

export const STAND_OFFSET_Z = BOARD_Z + BOARD_CLEARANCE; // 47
export const STAND_OFFSET_X = BOARD_X + BOARD_CLEARANCE; // 66

export const STAND_TIERS = 6;
export const STAND_TIER_HEIGHT = 1.1;
export const STAND_TIER_DEPTH = 1.6;

const STAND_DEPTH_EXTENT = STAND_TIERS * STAND_TIER_DEPTH; // 9.6
const HALF_TIER_PAD = STAND_TIER_DEPTH / 2; // 0.8

// Farthest-from-pitch edge of each stand pair, in world space
export const STAND_OUTER_Z = STAND_OFFSET_Z + HALF_TIER_PAD; // z-facing stands
export const STAND_OUTER_X = STAND_OFFSET_X + STAND_DEPTH_EXTENT + HALF_TIER_PAD; // x-facing stands

// Roof clearance — always guaranteed to sit outside the stands, whatever
// STAND_TIERS/TIER_DEPTH end up being
const ROOF_MARGIN = 4;
export const ROOF_INNER_HALF_X = STAND_OUTER_X + ROOF_MARGIN;
export const ROOF_INNER_HALF_Z = STAND_OUTER_Z + ROOF_MARGIN;
export const ROOF_OUTER_HALF_X = ROOF_INNER_HALF_X + 20;
export const ROOF_OUTER_HALF_Z = ROOF_INNER_HALF_Z + 20;
export const ROOF_CORNER_RADIUS = 22;
export const ROOF_HEIGHT = 21;