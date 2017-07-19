// $(document).ready(function() {
//     $('#execute-code').click(function(event) {
//         event.preventDefault();
//         console.log("TESTE", editor.getValue());
//         $.ajax({
//          type: 'GET',
//          url: "http://localhost:8000/reporting"
//         }).then(function(data, status) {
//             console.log("Data: ", data);
//             console.log("\nStatus: ", status);
//             window.open(data);
//         });
//     });
// });

var app = angular.module('jsReportingApp', []);

app.controller('headerBarCtrl', function($scope, $http, $sce, $http, $q) {

    $scope.executar = function() {

        $http.get("http://localhost:8000/reporting", { responseType: 'arraybuffer' }).then(function(data, status) {
            console.log("Data: ", data);
            console.log("\nStatus: ", status);
            var file = new Blob([data.data], { type: 'application/pdf' });
            console.log("file", file);
            var fileURL = URL.createObjectURL(file);
            $scope.content = $sce.trustAsResourceUrl(fileURL);
            window.open($scope.content);
        });
        //console.log("TESTE", editor.getValue());
    }
});

app.controller('contentCtrl', function($scope, $http, $sce, $http, $q) {
    $http.get("../projects/helpers.js").then(function(data) {
        javascript.setValue(data.data);
        console.log(data);

    });

    $http.get("../projects/data.json").then(function(data2) {
        console.log(data2);
        json.setValue(JSON.stringify(data2.data, null, '\t'));
    });

    $http.get("../projects/page.html").then(function(data3) {
        console.log(data3);
        html.setValue(data3.data);
    });

});