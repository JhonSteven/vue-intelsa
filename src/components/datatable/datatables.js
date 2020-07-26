export function generateColumns(columns) {
    return columns.map(column => ({
        data: column.data,
        name: ('name' in column ? column.name : column.data),
        title: column.title,
        searchable: ('searchable' in column ? column.searchable : true),
        orderable: ('orderable' in column ? column.orderable : true),
        hidden: ('hidden' in column ? column.hidden : false),
        search: {
            value: ('search' in column ? column.search.value : ''),
            regex: ('search' in column ? column.search.regex : false),
        },
    }));
}

export function generateSort(columnKey = 0, dir = 'asc') {
    return [{
        column: columnKey,
        dir: dir,
    }]
}

export function getDataOfColumn(result, column) {
    let resultData = result;
    let columns = column.split('.');
    columns.forEach((column) => {
        if (typeof resultData === 'object' && resultData && column in resultData && resultData[column]) {
            resultData = resultData[column]
        } else {
            resultData = '';
        }
    });
    return resultData;
}