const type = 'application/json';
const apiUrl = 'https://69267d1326e7e41498fa77ba.mockapi.io/app/tasks';
const endpoints = {
    task: '/samu_task'
}

// GET
export function getTasks() {
    return fetch(apiUrl + endpoints.task, {
        method: 'GET',
        headers: {
            'Content-type': type
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        alert(`${error}`);
        return [];
    });
}

// POST
export function postTask(task){
    return fetch(apiUrl + endpoints.task, {
        method: 'POST',
        headers: {
            'Content-type': type
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        alert(`${error}`);
        return null;
    });
}

// DELETE
export function deleteTask(id){
    return fetch(apiUrl + endpoints.task + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': type
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        alert(`${error}`);
        return null;
    });
}

// PUT
export function putTask(id, task) {
    return fetch(apiUrl + endpoints.task + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': type
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        alert(`${error}`);
        return null;
    });
}