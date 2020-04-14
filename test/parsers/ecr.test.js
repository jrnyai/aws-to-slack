/* eslint-disable */

// The generic parser is intended to match anything that DOES NOT match another parser.
// Update these examples below if they happen to match your custom parser format.

const simpleSnsPacket = {
	Records: [{
		"EventVersion": "1.0",
		"EventSubscriptionArn": `arn:aws:sns:region:account-id:topicname:subscriptionid`,
		"EventSource": "aws:sns",
		"Sns": {
            "Type": "Notification",
            "MessageId": "1a159040-26ba-5f1b-bb57-c746dea7f621",
            "TopicArn": "arn:aws:sns:region:account-id:topicname",
            "Subject": null,
            "Message": "{\"version\":\"0\",\"id\":\"90fbf703-bbba-e4d9-e7c4-c4477f93107a\",\"detail-type\":\"ECR Image Scan\",\"source\":\"aws.ecr\",\"account\":\"accountid\",\"time\":\"2020-04-07T21:51:25Z\",\"region\":\"region\",\"resources\":[\"arn:aws:ecr:region:accountid:repository/repository_name\"],\"detail\":{\"scan-status\":\"COMPLETE\",\"repository-name\":\"repository_name\",\"image-digest\":\"sha256:digestshastring\",\"image-tags\":[\"image-tag\"],\"finding-severity-counts\":{\"HIGH\":1,\"MEDIUM\":2,\"CRITICAL\":5}}}",
            "Timestamp": "2020-04-07T21:51:25.528Z",
            "SignatureVersion": "1",
            "Signature": "PPNqRQulm8QxA1qx0N74Ncs08eT+xz4l49t1wt00aSzmmhJvyfJuHpXtxfb5roJB7piUu2NzcpbJcxuHVrN8PKBbWYdE/Jkzr3fpB+Mz919ByD05Gw9tUhfMg6e5FB7JgjQE0HAQU8V96kw7yB+IoiB3BqNZTLNa9qVWJAJftMEx3nPZDowvdvMz+Flns3nfNwrIULZd5Fqqr42MrtMvQICblaj19vq8V3iRZ0e+Ao088DAAkb8/sEIPrDZTtcXoQqaHET4E8EkRI3oowQyKQ3LALY9G6hBuyrLyc9V3D9KVSLUBtiOj4EkILRFnbbf5K8ZsiDgEYL7e9IBcADwaUw==",
            "MessageAttributes": {}
		}
	}]
};


const mock = require("./_parser_mock").named("ecr");
mock.matchesEvent(simpleSnsPacket);

mock.matchesEventWithDetail(simpleSnsPacket, {
	"author_name": "AWS ECR",
	"color": "danger",
	"fallback":"5 Critical, 1 High, 2 Medium and 0 Low issues were found on the image repository_name",
	"title": "Some vulnerabilities have been found on an ECR Image.",
});