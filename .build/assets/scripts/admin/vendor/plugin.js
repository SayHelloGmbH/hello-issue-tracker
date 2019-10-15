import {snakeToCamel} from "./helpers";

const pluginConfig = {};
let pluginStrings = {};
if ('HelloIssueTrackerConfig' in window) {
	Object.keys(window.HelloIssueTrackerConfig).forEach(key => {
		if (key === 'strings') {
			pluginStrings = window.HelloIssueTrackerConfig[key];
		} else {
			pluginConfig[snakeToCamel(key)] = window.HelloIssueTrackerConfig[key];
		}
	});
}

export const strings = pluginStrings;
export const config = pluginConfig;
