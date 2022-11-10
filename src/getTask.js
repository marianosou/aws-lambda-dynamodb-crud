const AWS = require("aws-sdk");

const getTask = async event => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();
	const id = event.pathParameters.id;

	try {
		const result = await dynamodb
			.get({
				TableName: "TaskTable",
				Key: {
					id,
				},
			})
			.promise();

		task = result.Item

		return {
			statusCode: 200,
			body: JSON.stringify(task),
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getTask };
