import {getManagementCanister, HttpAgent} from "@dfinity/agent";
import {Principal} from "@dfinity/principal";

export const agentCanisterLogs = async ({ canisterId, identity }) => {
    const agent = await getLocalAgent({identity});

    const management = await getManagementCanister({ agent });
    const logs = await management.fetch_canister_logs({ canister_id: Principal.fromText(canisterId) });

    return logs;
}

export const getLocalAgent = async (params) => {
    const host = "http://127.0.0.1:4943";

    const agent = new HttpAgent({ ...params, host });

    // Fetch root key for certificate validation during development
    await agent.fetchRootKey();

    return agent;
};