// @flow

import type {IssueObject, apiIssueObject, CommentObject} from './types';
import moment from 'moment';
import {config} from './plugin';
import {html2md, md2html} from './showdown';

export function snakeToCamel(s: string): string {
	return s.replace(/(\-\w)/g, function (m) {
		return m[1].toUpperCase();
	});
}

export function formatIssueAttributes(category: string, key: string): string {
	if (!(category in config.issueAttributes)) {
		return key;
	}
	if (!(key in config.issueAttributes[category])) {
		return key;
	}
	return config.issueAttributes[category][key];
}

export function prepareIssueForList(issue: apiIssueObject): IssueObject {

	const hitLabels = {};
	for (const label of issue.labels) {
		const regex = new RegExp(`${config.labelPrefix}([a-z0-9]*): `);
		const match = regex.exec(label);
		if (match != null) {
			hitLabels[match[1]] = label.replace(match[0], '');
			issue.labels = issue.labels.filter(e => e !== label);
		}
	}

	for (const key of ['author', 'type', 'priority']) {
		if (!(key in hitLabels)) {
			hitLabels[key] = '';
		}
	}

	moment.locale(config.locale.split('_')[0]);

	return {
		iid: issue.iid,
		title: issue.title,
		description: md2html(issue.description),
		author: issue.author.name,
		authorLabel: hitLabels.author,
		date: moment(issue.created_at).format(config.dateFormat),
		state: issue.state,
		priority: hitLabels.priority,
		type: hitLabels.type,
		labels: issue.labels,
		hitLabels
	};
}

export function prepareIssueForApi(issue: IssueObject): apiIssueObject {

	issue.description = html2md(issue.description);

	issue.labels = [
		`${config.labelPrefix}type: ${issue.hitLabels.type}`,
		`${config.labelPrefix}priority: ${issue.hitLabels.priority}`
	];

	if (issue.iid === 0) {
		issue.labels.push(`${config.labelPrefix}author: ${config.user}`);
	} else {
		if (issue.hitLabels.author && issue.hitLabels.author !== '') {
			issue.labels.push(`${config.labelPrefix}author: ${issue.hitLabels.author}`);
		}
	}

	return issue;
}

export function parseComment(comment: Object): CommentObject {

	let body = comment.body || '';
	body = md2html(body);
	let author = comment.author.name;
	const pPrefix = config.labelPrefix.replace('<p>', '').replace('</p>', '');

	const regex = new RegExp(`<p>${pPrefix}author: ([^<]*)<\/p>`);
	const regexExec = regex.exec(body);
	if (regexExec) {
		author = regexExec[1];
		body = body.replace(regexExec[0], '');
	}

	moment.locale(config.locale.split('_')[0]);

	return {
		body,
		author,
		system: comment.system,
		date: moment(comment.created_at).format(config.dateFormat),
	};
}
