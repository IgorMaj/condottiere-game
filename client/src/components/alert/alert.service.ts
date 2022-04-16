let msgHandler = (msg: { content: string; timestamp: number }) => {};

export const registerAlert = (
  handler: (message: { content: string; timestamp: number }) => void
) => {
  msgHandler = handler;
};

export const showAlert = (msg: string) => {
  msgHandler({ content: msg, timestamp: new Date().getTime() });
};
