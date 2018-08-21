import Reflux from 'reflux'


const LanguageActions = Reflux.createActions({
  init: {
    asyncResult: true
  },
  select: {
    asyncResult: true
  }
});


LanguageActions.init.listen(function () {
  window.$.getJSON('assets/langs/languages.json')
    .then(this.completed, this.failed)


})

LanguageActions.select.listen(function (language) {
  window.$.getJSON('assets/langs/' + language.key + '.json')
    .then(this.completed, this.failed)
});


export default LanguageActions;