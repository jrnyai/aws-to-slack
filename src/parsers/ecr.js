//
// AWS Config event parser
//
exports.matches = event => event.getSource() === "ecr";

exports.parse = event => {
	const detail = event.get("detail");
	const repository = _.get(detail, "repository-name");
	const imageDigest = _.get(detail, "image-digest");
	const imageTags = _.get(detail, "image-tags");
	const highSeverity = _.get(detail, "finding-severity-counts.HIGH", 0);
	const mediumSeverity = _.get(detail, "finding-severity-counts.MEDIUM", 0);
	const lowSeverity = _.get(detail, "finding-severity-counts.LOW", 0);
	const criticalSeverity = _.get(detail, "finding-severity-counts.CRITICAL", 0);
	const fields = [];
	const title ="Some vulnerabilities have been found on an ECR Image.";
	
	let color = event.COLORS.neutral;

	fields.push({
		title: "Repository",
		value: repository,
		short: true
	});
	fields.push({
		title: "Image Digest",
		value: imageDigest,
		short: true
	});
	fields.push({
		title: "Image Tags",
		value: (imageTags || []).join(", "),
		short: false
	});

	fields.push({
		title: "Critical Severity Issues",
		value: criticalSeverity || 0,
		short: true
	});
	fields.push({
		title: "High Severity Issues",
		value: highSeverity || 0,
		short: true
	});
	fields.push({
		title: "Medium Severity Issues",
		value: mediumSeverity || 0,
		short: true
	});

	fields.push({
		title: "Low Severity Issues",
		value: lowSeverity || 0,
		short: true
	});

	if((lowSeverity+mediumSeverity+highSeverity+criticalSeverity) < 1) {
		console.log("no issues to report");
		process.exit;
	}
	if(lowSeverity>0) {
		color = event.COLORS.accent;
	}
	if(mediumSeverity>0) {
		color = event.COLORS.warning;
	}
	if(highSeverity>0) {
		color = event.COLORS.critical;
	}
	if(criticalSeverity>0) {
		color = event.COLORS.critical;
	}

	return event.attachmentWithDefaults({
		title: title,
		author_name: "AWS ECR",
		mrkdwn_in: ["title", "text"],
		fallback: `${criticalSeverity || 0} Critical, ${highSeverity || 0} High, ${mediumSeverity || 0} Medium and ${lowSeverity || 0} Low issues were found on the image ${repository}`,
		color,
		fields,
	});
};
