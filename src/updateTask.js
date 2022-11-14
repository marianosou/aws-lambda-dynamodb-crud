const AWS = require("aws-sdk");

const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const updateTaskStatus = async event => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();
	const id = event.pathParameters.id;
	const { done } = event.body;

	try {
		const result = await dynamodb
			.update({
				TableName: "TaskTable",
				Key: { id },
				UpdateExpression: "set done = :done",
				ExpressionAttributeValues: {
					":done": done,
				},
				ReturnValues: "ALL_NEW",
			})
			.promise();

		const updatedTask = result.Attributes;

		return {
			statusCode: 200,
			body: JSON.stringify(updatedTask),
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	updateTaskStatus: middy(updateTaskStatus).use(jsonBodyParser()),
};
