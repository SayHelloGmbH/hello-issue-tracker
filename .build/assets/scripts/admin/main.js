import ConfigString from './vendor/config-string';
import App from './Components/App.vue';

Vue.mixin(ConfigString);

if (document.querySelector('#hello-issue-tracker')) {
	new Vue({
		el: '#hello-issue-tracker',
		//mixins: [ConfigString],
		render: h => h(App)
	});
}
