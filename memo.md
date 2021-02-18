### Migration Vue 2 => Vue 3

``vue add vue next`` 
Upgrade la version de Vue.

Problèmes de compatibilité:
- vue-mapbox (remplacé par mapbox)

### Ajouter typescript

``vue add typescript``
Transforme les fichiers .js en .ts et modifie le code
Cependant, il reste beaucoup de modifications à faire à la main.

Problèmes de compatibilité:
- timeago.js (remplacé par vue-moment)

##### Modifications à faire:
- Préciser ``lang="ts"`` dans les balises script des components
- Les routes et les imports se déclarent différemment
- Les exports ``export default {}`` doivent être remplacés par ``export default defineComponent({})``, sans oublier de rajouter l'import ``import { defineComponent } from 'vue';``
- Dans le fichier ``main.ts``, pour utiliser le routeur il faut déclarer: ``createApp(App).use(router).mount('#app');``

/!\ A l'installation de typescript, le component ``HelloWorld`` est ajouté et le contenu de ``App.vue`` est écrasé.
