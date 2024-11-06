exports.handler = async (event, context) => {
  // 인증 후 처리할 로직
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Google 인증 완료" }),
  };
};
