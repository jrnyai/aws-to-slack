//
// AWS GuardDuty event parser
//
exports.matches = event => event.getSource() === "securityhub";

exports.parse = event => {
	const detail = event.get("detail.findings[0]");
	const title = _.get(detail, "Title");
	const description = _.get(detail, "Description");
	const createdAt = new Date(_.get(detail, "CreatedAt"));
	const accountId = _.get(detail, "AwsAccountId");
	const resources = _.get(detail, "Resources");
	const severity = _.get(detail, "severity.normalized");
	const fields = [];
	const recomendationText = _.get(detail, "Remediation.Recommendation.Text");
	const recomendationLink = _.get(detail, "Remediation.Recommendation.Url");

	fields.push({
		title: "Description",
		value: description,
		short: false
	});

	fields.push({
		title: "Account",
		value: accountId,
		short: true
	});

	fields.push({
		title: "Severity",
		value: severity,
		short: true
	});

	const eventFirstSeen = _.get(detail, "CreatedAt");
	const eventLastSeen = _.get(detail, "LastObservedAt");
	fields.push({
		title: "Resource",
		value: `${resources[0].Type} - ${resources[0].Id}`,
		short: true
	});
	fields.push({
		title: "First Seen At",
		value: eventFirstSeen,
		short: true
	});

	fields.push({
		title: "Last Seen At",
		value: eventLastSeen,
		short: true
	});
	fields.push({
		title: "Recommendation",
		value: `${recomendationLink} - ${recomendationText}`
	});
	let color = event.COLORS.neutral;
	if (severity > 39) {
		color = event.COLORS.critical;
	} else if (severity > 0) {
		color = event.COLORS.warning;
	}

	return event.attachmentWithDefaults({
		author_name: "Amazon SecurityHub",
		fallback: `${title} ${description}`,
		color: color,
		title: title,
		fields: fields,
		mrkdwn_in: ["title", "text"],
		ts: createdAt
	});
};
