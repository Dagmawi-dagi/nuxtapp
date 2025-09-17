import withErrorHandler from '@/server/utils/catchAsync';

export default withErrorHandler(async (event) => {
  const url = getRequestURL(event).pathname;
    /// NOTE we will be using the event.context.modifiedBody after this middle ware

  if (url.includes("/api/")) {
    const apiConfig = event.context.APIINFO;

    // Ensure modifiedBody always exists
    if (!event.context.modifiedBody) {
      if (["POST", "PUT", "PATCH"].includes(event.node.req.method)) {
        event.context.modifiedBody = await readBody(event);
      } else {
        event.context.modifiedBody = {};
      }
    }

    // Add createdBy if required
    if (apiConfig.addCreatedBy) {
      event.context.modifiedBody.createdBy = event.context.user.id;
    }
  }
});
