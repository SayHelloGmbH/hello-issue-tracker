<template>
	<div class="hit-page" v-if="urlSet">
		<issues-list class="hit-page__side"/>
		<issues-issue class="hit-page__main"/>
	</div>
	<div class="hit-page" v-else>
		<div class="hit-notice hit-notice--error">
			<p>{{string('repo-url-not-set')}}</p>
		</div>
	</div>
</template>
<script>
	import {config, strings} from './../vendor/plugin';
	import IssuesList from './IssuesList.vue';
	import IssuesIssue from './IssuesIssue.vue';

	export default {
		data() {
			return {
				urlSet: config.gitlab.repoUrl
			}
		},
		components: {
			IssuesIssue,
			IssuesList
		}
	}
</script>
