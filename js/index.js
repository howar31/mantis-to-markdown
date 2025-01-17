$(document).ready(function () {
    console.log('ready');
});

$('#convert').click(function() {
    $('#message').hide();

    if ($('#input').val() === '') {
        $('#message').text('Input empty').show();
        return;
    }

    var markdownData = '';
    var csvData = $.csv.toObjects($('#input').val());
    if (csvData === undefined || csvData.length == 0) {
        $('#message').text('Invalid CSV string').show();
        return;
    }

    csvData.sort(function(a, b) {
        var serverityScore = {
            feature: 10,
            trivial: 20,
            text: 30,
            tweak: 40,
            minor: 50,
            major: 60,
            crash: 70,
            block: 80,
        };

        if (a.Severity !== b.Severity) {
            return serverityScore[b.Severity] - serverityScore[a.Severity];
        }
        return b.Id - a.Id;
    });

    csvData.forEach(row => {
        if ('Id' in row && 'Summary' in row && 'Severity' in row) {
            if (row.Id === undefined) {
                $('#message').text('Invalid Id data').show();
                return;
            }
            if (row.Summary === undefined) {
                $('#message').text('Invalid Summary data').show();
                return;
            }
            if (row.Severity === undefined) {
                $('#message').text('Invalid Severity data').show();
                return;
            }

            var id = parseInt(row.Id, 10);
            var briefSummary = row.Summary.replace(/\[[^\]]*_v[^\]]*\] /g, "");
            markdownData += `[[${id}][${row.Severity.charAt(0).toUpperCase() + row.Severity.slice(1)}] ${briefSummary}](https://benqhqmantis.benq.com/view.php?id=${id})\n`;
        } else {
            $('#message').text('Must have keys: Id, Summary, Severity').show();
        }
    });

    $('#output').val(markdownData);
});
