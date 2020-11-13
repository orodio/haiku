import { useState } from "react";
import { useInitialized } from "../hooks/use-initialized.hook";
import { useCurrentUser } from "../hooks/use-current-user.hook";
import { Wow, H3, P, A, Ul, Li, Button } from "../style/text.comp";
import { useConfig } from "../hooks/use-config.hook";
import { initializeAll } from "../flow/initialize-all.tx";

const DEFAULT = "DEFAULT";
const NEED_AUTH = "Waiting on Authorization";
const PROCESSING = "Initialization Sent to Chain";
const SUCCESS = "Account has been Initialized!";
const RELOADING = "Reloading Page";
const ERROR = "Something Went Wrong";

const sleep = (ms = 3000) => new Promise((resolve) => setTimeout(resolve, ms));

export function Initialize() {
  const [user, loggedIn] = useCurrentUser();
  const [init] = useInitialized(user.addr);
  const [profile] = useConfig("Contract.Profile");
  const [connections] = useConfig("Contract.Connections");
  const [status] = useConfig("Contract.Status");
  const [env] = useConfig("env");
  const [state, setState] = useState(DEFAULT);
  const [txId, setTxId] = useState(null);

  if (!loggedIn || init == null) return null;
  if (init.profile && init.connections && init.status) {
    return null;
  }

  async function initialize(e) {
    try {
      e.preventDefault();
      await initializeAll({
        onStart() {
          setState(NEED_AUTH);
        },
        onSubmitted(resp) {
          setTxId(resp.transactionId);
          console.log("Init Resp", resp);
          setState(PROCESSING);
        },
        onUpdate(txStatus) {
          console.log("Init txStatus", txStatus);
        },
        onSuccess() {
          setState(SUCCESS);
        },
        onError(error) {
          setState(ERROR);
          throw error;
        },
      });
      await sleep(2500);
      setState(RELOADING);
      await sleep(2000);
      window.location.reload();
    } catch (error) {
      console.error("Init Account", error);
      setState(ERROR);
      await sleep();
      setState(DEFAULT);
    }
  }

  return (
    <Wow>
      <H3>Almost There...</H3>
      <P>
        In order to use <strong>Haiku</strong>, your{" "}
        <A href="https://onflow.com" target="_blank">
          Flow Account
        </A>{" "}
        needs to be initialized with resources from the following Flow
        Contracts:
      </P>
      <Ul>
        <Li>
          <A
            href={`https://flow-view-source.com/${env}/account/${profile}`}
            target="_blank"
            rel="noreferrer"
          >
            {profile} (Profile)
          </A>
        </Li>
        <Li>
          <A
            href={`https://flow-view-source.com/${env}/account/${connections}`}
            target="_blank"
            rel="noreferrer"
          >
            {connections} (Connections)
          </A>
        </Li>
        <Li>
          <A
            href={`https://flow-view-source.com/${env}/account/${status}`}
            target="_blank"
            rel="norefferrer"
          >
            {status} (Status)
          </A>
        </Li>
      </Ul>
      <P>
        You can initialize your account with each contract individually in your{" "}
        <A>Settings</A>, or you can initialize all three contracts at once with
        the button bellow.
      </P>
      <P>
        {state === DEFAULT ? (
          <Button onClick={initialize}>Initialize Account</Button>
        ) : (
          <Button disabled>.*. *.* .*. *.* .*.</Button>
        )}
      </P>
      {state === NEED_AUTH && <P>Waiting on Authorization</P>}
      {state === PROCESSING && (
        <P>
          Transaction submitted to the Flow Blockchain. Waiting on chain to
          execute transaction.{" "}
          <A
            href={`http://flow-view-source.com/${env}/tx/${txId}`}
            target="_blank"
          >
            View Transaction
          </A>
        </P>
      )}
      {state === RELOADING && (
        <P>Reloading Haiku so we can be sure to pick up on the changes.</P>
      )}
      {state === SUCCESS && (
        <P>Your Flow Account has been initialized to use Haiku</P>
      )}
      {state === ERROR && (
        <P>Something went wrong and we couldn't initialize your Flow Account</P>
      )}
    </Wow>
  );
}
