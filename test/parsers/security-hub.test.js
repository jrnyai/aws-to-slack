const simpleSnsPacket = {
	Records: [
		{
			EventSource: "aws:sns",
			EventVersion: "1.0",
			EventSubscriptionArn:
				"arn:aws:sns:us-west-2:229111641549:notify-slack-topic:3884731f-66e9-4e72-944f-de3db38f4dfa",
			Sns: {
				Type: "Notification",
				MessageId: "ac9652c7-c744-57b6-a5ac-0404a863dbb0",
				TopicArn: "arn:aws:sns:us-west-2:229111641549:notify-slack-topic",
				Subject: null,
				Message:
					'{"version":"0","id":"1e655ac6-9a54-a66b-2da2-8cf116dddf0b","detail-type":"Security Hub Findings - Imported","source":"aws.securityhub","account":"229111641549","time":"2020-02-16T16:25:11Z","region":"us-west-2","resources":["arn:aws:securityhub:us-west-2::product/aws/securityhub/arn:aws:securityhub:us-west-2:229111641549:subscription/cis-aws-foundations-benchmark/v/1.2.0/4.2/finding/f80f3994-e294-48cf-8042-22cedd10a679"],"detail":{"findings":[{"ProductArn":"arn:aws:securityhub:us-west-2::product/aws/securityhub","Types":["Software and Configuration Checks/Industry and Regulatory Standards/CIS AWS Foundations Benchmark"],"Description":"Security groups provide stateful filtering of ingress/egress network traffic to AWS resources. It is recommended that no security group allows unrestricted ingress access to port 3389 .","SchemaVersion":"2018-10-08","Compliance":{"Status":"PASSED"},"GeneratorId":"arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0/rule/4.2","FirstObservedAt":"2020-02-15T01:03:34.197Z","CreatedAt":"2020-02-15T01:03:34.197Z","RecordState":"ACTIVE","Title":"4.2 Ensure no security groups allow ingress from 0.0.0.0/0 to port 3389","LastObservedAt":"2020-02-14T03:14:03.045Z","Severity":{"Normalized":0,"Product":0},"UpdatedAt":"2020-02-16T16:25:06.792Z","WorkflowState":"NEW","ProductFields":{"complianceStatus":"PASSED","StandardsGuideArn":"arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0","StandardsGuideSubscriptionArn":"arn:aws:securityhub:us-west-2:229111641549:subscription/cis-aws-foundations-benchmark/v/1.2.0","RuleId":"4.2","RecommendationUrl":"https://docs.aws.amazon.com/console/securityhub/standards-cis-4.2/remediation","RelatedAWSResources:0/name":"securityhub-restricted-rdp-c585f8c6","RelatedAWSResources:0/type":"AWS::Config::ConfigRule","RecordState":"ACTIVE","aws/securityhub/FindingId":"arn:aws:securityhub:us-west-2::product/aws/securityhub/arn:aws:securityhub:us-west-2:229111641549:subscription/cis-aws-foundations-benchmark/v/1.2.0/4.2/finding/f80f3994-e294-48cf-8042-22cedd10a679","aws/securityhub/SeverityLabel":"INFORMATIONAL","aws/securityhub/ProductName":"Security Hub","aws/securityhub/CompanyName":"AWS"},"AwsAccountId":"229111641549","Id":"arn:aws:securityhub:us-west-2:229111641549:subscription/cis-aws-foundations-benchmark/v/1.2.0/4.2/finding/f80f3994-e294-48cf-8042-22cedd10a679","Remediation":{"Recommendation":{"Text":"For directions on how to fix this issue, please consult the AWS Security Hub CIS documentation.","Url":"https://docs.aws.amazon.com/console/securityhub/standards-cis-4.2/remediation"}},"Resources":[{"Partition":"aws","Type":"AwsEc2SecurityGroup","Details":{"Other":{"description":"default VPC security group","groupName":"default","ipPermissions:0/ipProtocol":"-1","ipPermissions:0/userIdGroupPairs:0/groupId":"sg-b92493f2","ipPermissions:0/userIdGroupPairs:0/userId":"229111641549","ownerId":"229111641549","groupId":"sg-b92493f2","ipPermissionsEgress:0/ipProtocol":"-1","ipPermissionsEgress:0/ipv4Ranges:0/cidrIp":"0.0.0.0/0","ipPermissionsEgress:0/ipRanges:0":"0.0.0.0/0","vpcId":"vpc-68d17310"}},"Region":"us-west-2","Id":"arn:aws:ec2:us-west-2:229111641549:security-group/sg-b92493f2"}],"approximateArrivalTimestamp":1581870308}]}}',
				Timestamp: "2020-02-16T16:25:11.917Z",
				SignatureVersion: "1",
				Signature:
					"jji+vvfV9xEHFU8dLRashlUS0LYiKlcqwX2f2SIH1O7vvYKldfT1HQD8oCVCmUQyTn1QXDZYSv4rOYcWOu4V2yp9VD6oLExpFWV5fb3XCPttwITwpzprlKf1msowV8H7fJAia0d5V/6j4dve+r4Elc+DysBkQRGs6sqNdBpipK3FvI9wc7lVq51wPgyxqv0OTrcRDP8BESd0Xs00m/U3V8ilDHoJ/iUI6LENuIAnZVmjWVbPA+ty237R/EpU1is1BRc3ob1X6/uta0rjsD/9CMzGLoyLt+yXxHu5QilkrR7YapnBaU02ObRit13/cICV9q/0XdQMrp6Vy35yaYa0GQ==",
				SigningCertUrl:
					"https://sns.us-west-2.amazonaws.com/SimpleNotificationService-a86cb10b4e1f29c941702d737128f7b6.pem",
				UnsubscribeUrl:
					"https://sns.us-west-2.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-west-2:229111641549:notify-slack-topic:3884731f-66e9-4e72-944f-de3db38f4dfa",
				MessageAttributes: {}
			}
		}
	]
};

const mock = require("./_parser_mock").named("security-hub");
mock.matchesEvent(simpleSnsPacket);
