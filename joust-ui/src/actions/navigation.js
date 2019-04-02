export const ISSUE_MANUVER_ORDER = "ISSUE_MANUVER_ORDER";

export function issueManuverOrder(order) {
  return {
    type: ISSUE_MANUVER_ORDER,
    currentManuver: order,
  };
}

