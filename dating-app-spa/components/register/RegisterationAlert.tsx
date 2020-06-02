import React from "react";
import { Alert } from "react-bootstrap";

export const RegistrationAlert = ({
  registrationStatus,
  MessageStatus,
}: any) => {
  if (registrationStatus.status === MessageStatus.None) return null;

  return (
    <Alert
      variant={
        registrationStatus.status === MessageStatus.Error ? "danger" : "success"
      }
    >
      {registrationStatus.status === MessageStatus.Error &&
        registrationStatus.multipleMessages &&
        Object.keys(registrationStatus.messages).map(
          (key: string, i: number) => (
            <React.Fragment key={i}>
              <strong>{key}:</strong>
              <ul>
                {registrationStatus.messages[key].map(
                  (msg: string, j: number) => (
                    <li key={"msg-" + j}>{msg}</li>
                  )
                )}
              </ul>
            </React.Fragment>
          )
        )}
      {registrationStatus.status === MessageStatus.Error &&
        !registrationStatus.multipleMessages && (
          <strong>{registrationStatus.message}</strong>
        )}
      {registrationStatus.status === MessageStatus.Success && (
        <strong>{registrationStatus.message}</strong>
      )}
    </Alert>
  );
};
