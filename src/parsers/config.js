//
// AWS Config event parser
//
exports.matches = (event) => event.getSource() === "config";

exports.parse = (event) => {
	const detail = event.get("detail");
	const messageType = _.get(detail, "messageType");
	const resource = _.get(detail, "resourceId");
	const configRuleName = _.get(detail, "configRuleName");
	const configRuleArn = _.get(detail, "configRuleARN");
	const resourceType = _.get(detail, "resourceType");
	const oldStatus = _.get(detail, "oldEvaluationResult.complianceType");
	const newStatus = _.get(detail, "newEvaluationResult.complianceType");
	const fields = [];
	let title = "AWS Config Change";
	let color = event.COLORS.neutral;
	let fallback = "";

	fields.push({
		title: "Old Status",
		value: oldStatus,
		short: true,
	});
	fields.push({
		title: "New Status",
		value: newStatus,
		short: true,
	});
	fields.push({
		title: "Resource Type",
		value: resourceType,
		short: true,
	});
	fields.push({
		title: "Resource ARN",
		value: resource,
		short: true,
	});
	fields.push({
		title: "Config Rule ARN",
		value: configRuleArn,
		short: true,
	});
	fields.push({
		title: "Config Rule Name",
		value: configRuleName,
		short: true,
	});

	if (messageType === "ComplianceChangeNotification") {
		if (
			newStatus === "NON_COMPLIANT" ||
			(newStatus === "COMPLIANT" && oldStatus === "NON_COMPLIANT")
		) {
			title = `${configRuleName} on ${resourceType} ${resource} moved to ${newStatus}`;
			fallback = `A Compliance Rule changed from ${oldStatus} to ${newStatus}. ${configRuleName} ${resourceType} ${resource}`;
			if (oldStatus === "COMPLIANT") {
				if (newStatus === "NON_COMPLIANT") {
					color = event.COLORS.critical;
				} else {
					color = event.COLORS.warning;
				}
			} else if (newStatus === "COMPLIANT") {
				color = event.COLORS.ok;
			}
		} else {
			return true;
		}
	}
	return event.attachmentWithDefaults({
		title: title,
		author_name: "AWS Config",
		mrkdwn_in: ["title", "text"],
		fallback,
		color,
		fields,
	});
};
