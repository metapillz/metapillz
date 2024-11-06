exports.handler = async (event, context) => {
  console.log("Callback function invoked");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Google 인증 완료" }),
  };
};

