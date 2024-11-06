import { DocumentType } from "../interfaceTypes";

export const getData = async () => {
    const data = localStorage.getItem('documents');
    if (data) {
        return JSON.parse(data);
    }
    const response = await fetch('/data.json');
    const jsonData = await response.json();
    localStorage.setItem('documents', JSON.stringify(jsonData));
    return jsonData;
};

export const saveData = (data: DocumentType[]) => {
    localStorage.setItem('documents', JSON.stringify(data));
};