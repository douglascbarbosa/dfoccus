import React from 'react'

export default class Datatable extends React.Component {

  componentDidMount() {
    this.datatable();
  }

  componentDidUpdate(){
//     console.log(window.$(this._dataTable).DataTable());
    //this._dataTable.draw();
    //window.$(this._dataTable).DataTable().clear();
    this._dataTable.clear();
    this._dataTable.rows.add(this.props.options.data);
    this._dataTable.draw();
  }

  datatable() {

    //Create the datatable element!
    const element = window.$(this.refs.table);

    //Take the Datatable options!
    let {options} = {...this.props} || {};

    //Creating the Datatable element object!
    this._dataTable = element.DataTable(options);

  }

  render() {
    let {children, options, detailsFormat, paginationLength, ...props} = this.props;
    return (
      <table {...props} ref="table">
        {children}
      </table>
    )
  }
}