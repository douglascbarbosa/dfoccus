import React from 'react'
import Reflux from 'reflux'
import classnames from 'classnames'
import LanguageActions from './LanguageActions'
import LanguageStore from './LanguageStore'

import FlagIcon from '../common/FlagIcon'

export default class LanguageSelector extends Reflux.Component{
    constructor(props)
    {
      super(props);
      this.state = {}; // our store will add its own state to the component's
      this.store = LanguageStore; // <- just assign the store class itself
      LanguageActions.init();

    }
    render () {

        let languages = this.state.languages;
        let language = this.state.language;
        if(!this.state.language) return <div/>
        return (
            <li className="dropdown messages-menu">

                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <FlagIcon code={language.key}/>
                    <span>&nbsp;{language.title}&nbsp;</span>
                </a>

                <ul className="dropdown-menu pull-right">
                    {languages.map((_lang, idx)=>{
                        return (
                            <li key={idx} className={classnames({
                                active: _lang.key == language.key
                            })}>
                                <a href="#" onClick={this._selectLanguage.bind(this, _lang)} >
                                    <FlagIcon code={_lang.key}  /> {_lang.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </li>
        )
    }
    _selectLanguage(language){
        LanguageStore.setLanguage(language);
        LanguageActions.select(language)
    }
}
