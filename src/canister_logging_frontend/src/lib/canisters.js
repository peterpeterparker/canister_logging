import { createActor, canisterId } from "declarations/canister_logging_backend";

export const backend = createActor(canisterId, {
  agentOptions: {
    host: "http://127.0.0.1:4943",
  },
});
