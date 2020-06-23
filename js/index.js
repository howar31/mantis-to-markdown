$(document).ready(function () {
    console.log('ready');
});

$('#convert').click(function() {
    var markdownData = '';
    var csvData = $.csv.toObjects($('#input').val());

    csvData.sort(function(a, b) {
        var keyA = new Date(a.Id),
            keyB = new Date(b.Id);
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });

    csvData.forEach(row => {
        var id = parseInt(row.Id, 10);
        var briefSummary = row.Summary.replace(/\[[^\]]*_v[^\]]*\] /g, "");
        markdownData += `[[${id}][${row.Priority.charAt(0).toUpperCase() + row.Priority.slice(1)}] ${briefSummary}](https://benqhqmantis.benq.com/view.php?id=${id})\n`;
    });

    $('#output').val(markdownData);
});
