const AWS = require("aws-sdk");

const deleteTask = async event => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();
	const id = event.pathParameters.id;

	try {
		await dynamodb
			.delete({
				TableName: "TaskTable",
				Key: { id },
			})
			.promise();

		return {
			statusCode: 201,
			body: JSON.stringify({
				message: `${id} Task Deleted`,
			}),
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = { deleteTask };
