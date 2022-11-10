const AWS = require("aws-sdk");

const getTasks = async event => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();

	try {
		const result = await dynamodb
			.scan({
				TableName: "TaskTable",
			})
			.promise();

		const tasks = result.Items;

		return {
			statusCode: 200,
			body: JSON.stringify(tasks),
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getTasks };
