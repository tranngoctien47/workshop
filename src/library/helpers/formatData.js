export const formatDataStatistic = (data) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    data[i].items.forEach((item) => {
      const eachUser = {};
      if (result.length === 0) {
        eachUser.user = item.user;
        eachUser[item.question._id] = item.answer;
        if (item.options.length > 0) {
          eachUser["options"] = item.options
            .map((option) => option.fullname)
            .join(", ");
        }
        result.push(eachUser);
        return;
      }
      if (item.user._id === result[result.length - 1].user._id) {
        result[result.length - 1][item.question._id] = item.answer;
        if (item.options.length > 0) {
          result[result.length - 1]["options"] = item.options
            .map((option) => option.fullname)
            .join(", ");
        }
        return;
      }
      eachUser.user = item.user;
      eachUser[item.question._id] = item.answer;
      if (item.options.length > 0) {
        eachUser["options"] = item.options
          .map((option) => option.fullname)
          .join(", ");
      }
      result.push(eachUser);
    });
  }
  return result;
};
export const formatDataAnswers = (data) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    data[i].items.forEach((item) => {
      result.push({ ...item });
      if (item.options.length > 0) {
        result.push({
          ...item,
          question: {
            content: `Nếu chọn Có đi ra nuôi dưỡng, xin kể tên Thánh đồ trong khu vực Phòng nhóm Q7 cùng tư gia, nuôi dưỡng (Nếu với Thánh đồ ở địa phương khác thì ghi "Có tư gia")`,
          },
          answer: item.options.map((option) => option.fullname).join(", "),
        });
      }
    });
  }
  return result;
};
export const formatDataCount = (listAnswer, listQuestion) => {
  return listQuestion.map((item, index) => {
    const countObj = {};
    listAnswer.forEach((answer, iAnswer) => {
      const countAnswer = answer.find((cItem) => cItem._id === item._id);
      countObj[`week${iAnswer + 1}`] = countAnswer ? countAnswer.count : 0;
    });
    return { key: index + 1, ...countObj, content: item.content };
  });
};
