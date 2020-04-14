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
            "MessageId": "8c84adf5-c467-58ea-a56f-fafb24340044",
            "TopicArn": "arn:aws:region:account-id:notify-slack-topic",
            "Subject": null,
            "Message": "{\"version\":\"0\",\"id\":\"7ccbef40-b450-83b8-9295-2ceeccbbe7e0\",\"detail-type\":\"Config Rules Compliance Change\",\"source\":\"aws.config\",\"account\":\"account-id\",\"time\":\"2020-04-13T21:47:57Z\",\"region\":\"region\",\"resources\":[],\"detail\":{\"resourceId\":\"AIDATKWA6GXGSFD4SOEVS\",\"awsRegion\":\"region\",\"awsAccountId\":\"account-id\",\"configRuleName\":\"securityhub-iam-user-no-policies-check-791d3b9c\",\"recordVersion\":\"1.0\",\"configRuleARN\":\"arn:aws:config:region:account-id:config-rule/aws-service-rule/securityhub.amazonaws.com/config-rule-g0fmvh\",\"messageType\":\"ComplianceChangeNotification\",\"newEvaluationResult\":{\"evaluationResultIdentifier\":{\"evaluationResultQualifier\":{\"configRuleName\":\"securityhub-iam-user-no-policies-check-791d3b9c\",\"resourceType\":\"AWS::IAM::User\",\"resourceId\":\"AIDATKWA6GXGSFD4SOEVS\"},\"orderingTimestamp\":\"2020-04-13T21:47:43.216Z\"},\"complianceType\":\"NON_COMPLIANT\",\"resultRecordedTime\":\"2020-04-13T21:47:56.953Z\",\"configRuleInvokedTime\":\"2020-04-13T21:47:56.756Z\"},\"oldEvaluationResult\":{\"evaluationResultIdentifier\":{\"evaluationResultQualifier\":{\"configRuleName\":\"securityhub-iam-user-no-policies-check-791d3b9c\",\"resourceType\":\"AWS::IAM::User\",\"resourceId\":\"AIDATKWA6GXGSFD4SOEVS\"},\"orderingTimestamp\":\"2020-04-13T21:13:07.891Z\"},\"complianceType\":\"COMPLIANT\",\"resultRecordedTime\":\"2020-04-13T21:13:24.077Z\",\"configRuleInvokedTime\":\"2020-04-13T21:13:23.915Z\"},\"notificationCreationTime\":\"2020-04-13T21:47:57.533Z\",\"resourceType\":\"AWS::IAM::User\"}}",
            "Timestamp": "2020-04-13T21:48:03.921Z",
            "SignatureVersion": "1",
            "Signature": "c/HjAOh/lhnsLHcdIWtI9l3GfQIscoeceZtERulJdEGcKrWUyyxyaBhxJFydsBByRVlBglFboWsyNb/H4/1x7t29jo534hHdaNWDp4PCAQ/ZnS3wT/xVWcToCbtxA2Dbaigamks1N2n3KeP+cvDukaLxR/+jHO8KC+jds/US5HE7WyOk5n263AkzfbYiCvBnwpj8UYs9Y86bvEML+5XiME0iIdBFAmuCHvru4H6suFT2Si1SpD9aXdz7KSa2nw9MG83FfkhNvS8CA0mIAXDPFdW2x39TWoeX2mza/CE2nYoanZlnGeYxr0FuNkXsm5OzYzR/7pwGHJKUGmpbOmPXmA==",
            "MessageAttributes": {}
        }
	}]
};


const mock = require("./_parser_mock").named("config");
mock.matchesEvent(simpleSnsPacket);

mock.matchesEventWithDetail(simpleSnsPacket, {
	"author_name": "AWS Config",
	"color": "danger",
	"fallback":"A Compliance Rule changed from COMPLIANT to NON_COMPLIANT. securityhub-iam-user-no-policies-check-791d3b9c AWS::IAM::User AIDATKWA6GXGSFD4SOEVS",
	"title": "securityhub-iam-user-no-policies-check-791d3b9c on AWS::IAM::User AIDATKWA6GXGSFD4SOEVS moved to NON_COMPLIANT",
});