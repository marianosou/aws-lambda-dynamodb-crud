const AWS = require("aws-sdk");

const updateTask = async event => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();
	const id = event.pathParameters.id;
	const { title, description, done } = JSON.parse(event.body);

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
			statusCode: 200,
			body: JSON.stringify(updatedTask),
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = { updateTask };
