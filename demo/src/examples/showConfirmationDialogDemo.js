import { Button, Intent } from "@blueprintjs/core";
import React from "react";
import showConfirmationDialog from "../../../src/showConfirmationDialog";
import { useToggle } from "../renderToggle";

export default function Demo() {
  const [noCancel, noCancelComp] = useToggle({
    type: "noCancelButton",
    label: "No Cancel Button"
  });
  return (
    <div>
      {noCancelComp}
      <br></br>
      <br></br>

      <Button
        onClick={async function handleClick() {
          const doAction = await showConfirmationDialog({
            noCancelButton: noCancel,
            text:
              "Are you sure you want to re-run this tool? Downstream tools with linked outputs will need to be re-run as well!",
            intent: Intent.DANGER, //applied to the right most confirm button
            confirmButtonText: "Yep!",
            cancelButtonText: "Nope", //pass null to make the cancel button disappear
            // cancelButtonText: null, pass
            canEscapeKeyCancel: true //this is false by default
          });
          console.info("doAction:", doAction);
        }}
        text="Do some action"
      />
    </div>
  );
}
