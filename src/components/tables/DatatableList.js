import React from 'react';
import Datatable from './Datatable';
import history from '../../routes/History'

export default class DatatableList extends React.Component{

    afterTableDraw(){
        //Define the edit buttons click!
        let $ = window.$;
        $(`#${ this.props.id } tbody button.update-id`).on('click', this.onClickUpdateTable.bind(this));

        if (this.props.deleteevent){
            $(`#${ this.props.id } tbody button.delete-id`).on('click', this.onClickDeleteTable.bind(this));
        }
        
    }

    getObjDataId(obj){
        let $ = window.$;
        return $($(obj)[0].currentTarget).attr('data-id');
    }

    onClickDeleteTable(obj){
         this.props.deleteevent(this.getObjDataId(obj));
    }

    
    onClickUpdateTable(obj){
        //Halde the edit button click!
        history.push(`/${this.props.formroute}/${this.getObjDataId(obj)}`);
    }  

    getActionsButtons(data){
        let resultButtons = '';
        
        resultButtons = `<button class="btn btn-primary update-id" data-id="${data.id}"><i class="fa fa-pencil"></i></button>`;

        //If the delete handle was defined I'll add the delet button on the action column!
        if (this.props.deleteevent){
            resultButtons += '<button class="btn btn-danger delete-id" data-id="'+ data.id +'" style="margin-left: 5px"><i class="fa fa-trash-o"></i></button>'
        }    

        return resultButtons;
    }

    render(){
        const self = this;


        //Check if the user put the columnDefs in the options!
        let columnDefs = [];

        if (this.props.options.aoColumnDefs){
            columnDefs = [...this.props.options.aoColumnDefs] 
        }
        const qtdColumns = this.props.options.columns.length;

        columnDefs.push({
            "aTargets": [qtdColumns],
            "mData" : null,
            "mRender" : function (data, type, full){
              return self.getActionsButtons(full);
            }
          });

        //Addding the button click handler!
        let listOptions = {
            ...this.props.options,
            "aoColumnDefs" : columnDefs,            
            "drawCallback": this.afterTableDraw.bind(this)
        }
        
        return (
            <Datatable {...this.props} options={listOptions} className="table table-bordered table-hover" deleteevent="" >
                {this.props.children}
            </Datatable>
        )
    }

}