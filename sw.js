console.log('Service Worker Loaded...');

function localStorageSet(obj) {
    chrome.storage.local.set(obj);
    return 'success';
}

function localStorageGet(key, callback) {
    chrome.storage.local.get([key], function (result) {
        callback(result[key]);
    });
}

function localStorageRemove(key) {
    chrome.storage.local.remove([key]);
    return 'success';
}

function localStorageClear() {
    chrome.storage.local.clear();
    return 'success';
}

function localStorageGetAll(callback) {
    chrome.storage.local.get(null, function (items) {
        callback(items);
    });
}

function localStorageGetAllKeys(callback) {
    chrome.storage.local.get(null, function (items) {
        callback(Object.keys(items));
    });
}


// Test localStorageSet
console.log(localStorageSet({ key: 'value' }));

// Test localStorageGet
localStorageGet('key', function (result) {
    console.log('Get key:', result);
});

// Test localStorageRemove
console.log(localStorageRemove('key'));

console.log(localStorageSet({ key: 'value' }));

// Test localStorageClear
console.log(localStorageClear());

console.log(localStorageSet({ key: 'value' }));

// Test localStorageGetAll
localStorageGetAll(function (items) {
    console.log('Get all items:', items);
});

// Test localStorageGetAllKeys
localStorageGetAllKeys(function (keys) {
    console.log('Get all keys:', keys);
});
