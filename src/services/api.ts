import axios from "axios";

const Apihero = axios.create({
	baseURL: 'http://homologacao3.azapfy.com.br/'
});

export default Apihero;