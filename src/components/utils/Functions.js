export default class Functions {

    static floatToMoney(value){
        return 'R$ ' + this.floatTostr(value);
    }

    static floatTostr(value, decimalSeparator = ',') {
        return value.toString().replace('.', decimalSeparator);
    }
        

}