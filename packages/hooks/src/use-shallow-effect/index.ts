// From https://github.com/streamich/react-use/blob/master/src/useShallowCompareEffect.ts
import { useEffect, useRef } from "react";

import { shallowEqual } from "../utils";

const useCustomCompareEffect = (
  effect: () => void | (() => void),
  deps: any[],
  depsEqual: (prevDeps: any[], nextDeps: any[]) => boolean
) => {
  const ref = useRef<any[] | undefined>(undefined);

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  }

  useEffect(effect, ref.current);
};

const shallowEqualDepsList = (prevDeps: any[], nextDeps: any[]): boolean =>
  prevDeps.every((dep, index) => shallowEqual(dep, nextDeps[index]));

export const useShallowCompareEffect = (
  effect: () => void | (() => void),
  deps: any[]
) => {
  useCustomCompareEffect(effect, deps, shallowEqualDepsList);
};
