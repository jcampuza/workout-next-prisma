import { Mode } from '@prisma/client';
import { fix, KG_COEFFICIENT } from './utils';

export function getPercentage(primaryRoundedAmount: number, maxInLbs: number, mode: Mode) {
  const maxInKg = maxInLbs / KG_COEFFICIENT;
  const maxToUse = mode === Mode.KGS ? maxInKg : maxInLbs;

  return fix((primaryRoundedAmount / maxToUse) * 100);
}

export function getPrimaryRoundedAmount(max: number, percentage: number, mode: Mode) {
  return mode === Mode.KGS
    ? getRoundedAmountKg(max, percentage)
    : getRoundedAmountLbs(max, percentage);
}

export function getRoundedAmountLbs(max: number, percentage: number) {
  return fix(Math.round((max * percentage) / 5) * 5);
}

export function getRoundedAmountKg(max: number, percentage: number) {
  return fix(Math.round((max * percentage) / KG_COEFFICIENT / 2.5) * 2.5);
}

export function getSecondaryRoundedAmount(primaryRoundedAmount: number, mode: Mode) {
  return mode === Mode.KGS
    ? getLbsFromKgs(primaryRoundedAmount)
    : getKgsFromLbs(primaryRoundedAmount);
}

export function getLbsFromKgs(primaryRoundedAmount: number) {
  return fix(primaryRoundedAmount * KG_COEFFICIENT);
}

export function getKgsFromLbs(primaryRoundedAmount: number) {
  return fix(primaryRoundedAmount / KG_COEFFICIENT);
}
