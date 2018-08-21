import React from 'react'


const LoadingPage = ({ show }) => (

    <div className="page-loading" style={ show ? {display: 'block'} : {display: 'none'}}>
        <i className="fa fa-cog fa-spin fa-3x fa-fw" /> <span style={{fontSize: 18}}>Loading... </span>
    </div>

);

export default LoadingPage;