import { Principal } from "@dfinity/principal";
import { Actor } from "@dfinity/agent";
import { idlFactory as idlFactorIC } from "../../../declarations/ic/ic.factory.did.js";
import {getLocalAgent} from "$lib/agent.js";

export const canisterLogs = async ({ canisterId, identity }) => {
  const { fetch_canister_logs } = await getICActor({ identity });

  const { canister_log_records } = await fetch_canister_logs({
    canister_id: Principal.fromText(canisterId),
  });

  return canister_log_records;
};

const MANAGEMENT_CANISTER_ID = Principal.fromText("aaaaa-aa");

/* eslint-disable */

// Source nns-dapp - dart -> JS bridge
const transform = (_methodName, args, _callConfig) => {
  const first = args[0];
  let effectiveCanisterId = MANAGEMENT_CANISTER_ID;
  if (first && typeof first === "object" && first.canister_id) {
    effectiveCanisterId = Principal.from(first.canister_id);
  }

  return { effectiveCanisterId };
};

/* eslint-enable */

const getICActor = async (params) =>
  createActor({
    canisterId: MANAGEMENT_CANISTER_ID,
    config: {
      callTransform: transform,
      queryTransform: transform,
    },
    idlFactory: idlFactorIC,
    ...params,
  });

const createActor = async ({
  canisterId,
  idlFactory,
  config = {},
  ...rest
}) => {
  const agent = await getLocalAgent(rest);

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...config,
  });
};
