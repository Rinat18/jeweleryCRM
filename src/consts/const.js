export const API = "http://134.209.96.140"

export const STAFF_ACTIONS = {
    GET__STAFFS: "GET__STAFFS",
    GET_ONE_STAFF: "GET_ONE_STAFF",
    GET_POSITIONS: "GET_POSITIONS"
};

export const PRODUCT_ACTIONS = {
    GET_PRODUCTS: "GET_PRODUCTS",
    GET_ONE_PRODUCT: "GET_ONE_PRODUCT",
    GET_CATEGORIES: "GET_CATEGORIES",
    GET_SEARCH: "GET_SEARCH",
};

export const CLIENTS_ACTIONS = {
    GET_CLIENTS: 'GET_CLIENTS',
    GET_ONE_CLIENT: 'GET_ONE_CLIENT',
}

export const token = {
    GET_TOKEN: "GET_TOKEN"
}

export const CASH_LIST = {
    GET_LIST: "GET_LIST",
    GET_PAYMENT_TYPES: "GET_PAYMENT_TYPES",


}


// ! ПРИНИМАЕМ ИЗ БЕКА URL ПЕРВОДИМ ЕГО В FILE 

export function convertImageUrlToFile(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        xhr.onload = function () {
            if (xhr.status === 200) {
                const blob = new Blob([xhr.response], { type: 'image/jpeg' });
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                resolve(file);
            } else {
                reject(new Error('Failed to convert image URL to file object.'));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Failed to convert image URL to file object.'));
        };
        xhr.send();
    });
}

export async function convertImageToBlob(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        const blob = await response.blob();
        const filename = url.substring(url.lastIndexOf('/') + 1); // Получаем имя файла из URL
        const type = blob.type.split('/')[1]; // Получаем расширение файла из MIME-типа
        const file = new File([blob], `${filename}.${type}`, { type: blob.type });
        // console.log(file);
        return file;
    } catch (error) {
        console.error('Error converting image to file:', error);
        throw error;
    }
}

