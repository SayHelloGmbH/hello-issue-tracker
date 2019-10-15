<template>
	<div class="hit-issues">
		<div class="hit-issues__header">
			<form class="hit-issues__options">
				<div class="hit-issues__option">
					<label for="hit-issues-option-state">{{string('state')}} ({{activeState}})</label>
					<select @change="changeIssueStates" onchange="console.log('test')">
						<option v-for="(title, key) in states" :key="key" :value="key" v-bind:selected="(activeState === key)">
							{{title}}
						</option>
					</select>
				</div>
			</form>
			<button class="hit-issues__add-issue button button-primary js-hit-create-issue" @click="test('test')">{{string('create-issue')}}</button>
		</div>
	</div>
</template>
<script>
	import {config, strings} from './../vendor/plugin';

	export default {
		data() {
			return {
				states: config.issueAttributes.states,
				activeState: Object.keys(config.issueAttributes.states)[1]
			}
		},
		mounted() {
			console.log(this.states);
			console.log(this.activeState);
		},
		methods: {
			changeIssueStates: function (event) {
				console.log(event.target.value);
				this.activeState = event.target.value;
			},
			test: function (str) {
				console.log(str);
			}
		}
	}
</script>
