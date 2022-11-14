const AWS = require("aws-sdk");

const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const updateTask = async event => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();
	const id = event.pathParameters.id;
	const { title, description, done } = event.body;

	try {
		const result = await dynamodb
			.update({
				TableName: "TaskTable",
				Key: { id },
				UpdateExpression:
					"set title = :title, description = :description, done = :done",
				ExpressionAttributeValues: {
					":title": title,
					":description": description,
					":done": done,
				},
				ReturnValues: "ALL_NEW",
			})
			.promise();

		const updatedTask = result.Attributes;

		return {
			statusCode: 204,
			body: JSON.stringify(updatedTask),
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = { updateTask: middy(updateTask).use(jsonBodyParser()) };
