const ONION_STORAGE = 'ONION_STORAGE';
export const ONION_STR_LOGIN = 'ONION_STR_LOGIN';

class AppStorage {

	constructor(){
		this.store = localStorage.getItem(ONION_STORAGE);

		if (!this.store){
			this.store = {
				ONION_STR_LOGIN : null
			}
		} else {
			this.store = JSON.parse(this.store);
		}
	}

	add(key, value){
		this.store[key] = value;
		localStorage.setItem(ONION_STORAGE, JSON.stringify(this.store));
	}

	getValue(key){
		return this.store[key];
	}

	clearValue(key){
		this.store[key] = null;
		localStorage.setItem(ONION_STORAGE, JSON.stringify(this.store));
	}

}

export default new AppStorage;