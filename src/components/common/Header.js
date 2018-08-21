import React from 'react'
import LanguageSelector from '../i18n/LanguageSelector'
import {logout} from '../user/UserActions';

export default class Header extends React.Component {

	handleLogoutClick(){
		logout();
	}

  render() {
    return (

				<header className="main-header">

					<a href="index2.html" className="logo">
						<span className="logo-mini"><b>A</b>LT</span>
						<span className="logo-lg"><b>Onion</b>PFT</span>
					</a>

					<nav className="navbar navbar-static-top">

							<a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
								<span className="sr-only">Toggle navigation</span>
							</a>

							<div className="navbar-custom-menu">
								<ul className="nav navbar-nav">
									<LanguageSelector />

									<li>
										<a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
									</li>
									<li>
										<a href="#" onClick={this.handleLogoutClick.bind(this)} data-toggle="control-sidebar"><i className="fa  fa-sign-out"></i> Logout</a>
									</li>
								</ul>
							</div>
						
					</nav>

				</header>

    )
  }
}

