<script>
  import "../index.scss";
  import { backend } from "$lib/canisters";
  import {canisterLogs} from "$lib/ic.api.js";
  import {AnonymousIdentity} from "@dfinity/agent";
  import { canisterId } from 'declarations/canister_logging_backend';
  import { Ed25519KeyIdentity } from '@dfinity/identity';
  import {onMount} from "svelte";
  import {agentCanisterLogs} from "$lib/agent.js";

  let greeting = "";

  function onSubmit(event) {
    const name = event.target.name.value;
    backend.greet(name).then((response) => {
      greeting = response;
    });
    return false;
  }

  let identity;
  onMount(() => identity = Ed25519KeyIdentity.generate());

  const logs = async () => {
    const results = await canisterLogs({
      canisterId,
      identity
    });

    console.log("Logs ->", results);
  }

  const agentLogs = async () => {
    const results = await agentCanisterLogs({
      canisterId,
      identity
    });

    console.log("Logs ->", results);
  }
</script>

<main>
  <img src="/logo2.svg" alt="DFINITY logo" />
  <br />
  <br />
  <form action="#" on:submit|preventDefault={onSubmit}>
    <label for="name">Enter your name: &nbsp;</label>
    <input id="name" alt="Name" type="text" />
    <button type="submit">Click Me!</button>
  </form>
  <section id="greeting">{greeting}</section>

  <p>Add the temporary identity as controller:</p>
  <p><code>dfx canister update-settings --add-controller {identity?.getPrincipal().toText() ?? ""} canister_logging_backend</code></p>

  <button on:click={logs}>Fetch logs (see console)</button>
  <button on:click={agentLogs}>Fetch logs with agent-js mgmt (see console)</button>
</main>
