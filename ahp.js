var itemsColumnSumsDict = {};
var itemsRowSumsDict = {};
var criteriaColumnSumsDict = {};
var criteriaRowSumsDict = {};

var itemCriteriaAOA = [];
var step2AOA = [];
var step3AOA = [];
var step3aAOA = [];
var step4AOA = [];
var step5AOA = [];
var step6AOA = [];
var step7AOA = [];

function addItem(tableId) {
    var inputId = tableId === 'itemTable' ? 'itemInput' : 'criteriaInput';
    var itemName = document.getElementById(inputId).value;

    if (itemName.trim() === "") {
        alert("Please enter a " + (tableId === 'itemTable' ? 'item' : 'criteria') + " name");
        return;
    }

    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);

    cell1.innerHTML = itemName;
    cell2.innerHTML = '<button class="remove-btn" onclick="removeItem(this)">Remove</button>';
    
    // Clear the input field
    document.getElementById(inputId).value = "";
}

function removeItem(button) {
    // Traverse up to the <tr> element
    var row = button.closest('tr');
    
    // Remove the row from the table
    row.parentNode.removeChild(row);
}

function preparePairWiseTables() {
    var cnt = 0;

    var pairWiseRow = document.getElementById("pairWiseRow");
    while (pairWiseRow.firstChild) {
        pairWiseRow.removeChild(pairWiseRow.firstChild);
    }

    var pairWiseRow = document.getElementById("pairWiseRowCriteria");
    while (pairWiseRow.firstChild) {
        pairWiseRow.removeChild(pairWiseRow.firstChild);
    }

    var pairWiseRowButton = document.getElementById("pairWiseRowButton");
    if (pairWiseRowButton != null) {
        pairWiseRowButton.remove();
    }

    document.getElementById("step2h1").style.display = "block";

    var items = [];
    var criteria = [];

    var itemTable = document.getElementById("itemTable");
    var rows = itemTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var firstCellContent = rows[i].getElementsByTagName("td")[0].innerText;
        items.push(firstCellContent);
    }

    var criteriaTable = document.getElementById("criteriaTable");
    var rows = criteriaTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var firstCellContent = rows[i].getElementsByTagName("td")[0].innerText;
        criteria.push(firstCellContent);
    }

    for (var i = 0; i < criteria.length; i++) {
        var tableRow = document.getElementById("pairWiseRow");

        var newTable = document.createElement("table");
        newTable.id = "pairWise" + criteria[i];
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var newTableRow = document.createElement("tr");
        newTableRow.appendChild(document.createElement("th"));
        for (var j = 0; j < items.length; j++) {
            var newTableHeader = document.createElement("th");
            newTableHeader.innerHTML = items[j];
            newTableRow.appendChild(newTableHeader);
        }
        newTable.appendChild(newTableRow);

        for (var r = 0; r < items.length; r++) {
            var newTableRow = document.createElement("tr");
            var tdItemName = document.createElement("td");
            tdItemName.innerHTML = "<strong>" + items[r] + "</strong>";
            newTableRow.appendChild(tdItemName);
            for (var c = 0; c < items.length; c++) {
                var tdItemName = document.createElement("td");
                tdItemName.style.textAlign = "center";
                
                if (r !== c) {
                    var inputElement = document.createElement("input");
                    inputElement.type = "text";
                    inputElement.style.width = "30px";
                    tdItemName.appendChild(inputElement);
                } else {
                    var spanElement = document.createElement("span");
                    spanElement.innerHTML = "1";
                    tdItemName.appendChild(spanElement);
                }

                newTableRow.appendChild(tdItemName);
            }
            newTable.appendChild(newTableRow);
        }

        var newTD = document.createElement("td");
        newTD.style.textAlign = "center";
        newTD.style.verticalAlign = "top";
        var criteriaTableName = document.createElement("h2");
        criteriaTableName.innerHTML = criteria[i];
        newTD.appendChild(criteriaTableName);
        newTD.appendChild(newTable);
        tableRow.appendChild(newTD);

        cnt++;
    }

    var tableRowCriteria = document.getElementById("pairWiseRowCriteria");

    var newTable = document.createElement("table");
    newTable.id = "pairWiseCriteria";
    newTable.classList.add("styled-table");
    newTable.style.minWidth = "0px";
    var newTableRow = document.createElement("tr");
    newTableRow.appendChild(document.createElement("th"));
    for (var j = 0; j < criteria.length; j++) {
        var newTableHeader = document.createElement("th");
        newTableHeader.innerHTML = criteria[j];
        newTableRow.appendChild(newTableHeader);
    }
    newTable.appendChild(newTableRow);

    for (var r = 0; r < criteria.length; r++) {
        var newTableRow = document.createElement("tr");
        var tdItemName = document.createElement("td");
        tdItemName.innerHTML = "<strong>" + criteria[r] + "</strong>";
        newTableRow.appendChild(tdItemName);
        for (var c = 0; c < criteria.length; c++) {
            var tdItemName = document.createElement("td");
            tdItemName.style.textAlign = "center";
            
            if (r !== c) {
                var inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.style.width = "30px";
                tdItemName.appendChild(inputElement);
            } else {
                var spanElement = document.createElement("span");
                spanElement.innerHTML = "1";
                tdItemName.appendChild(spanElement);
            }

            newTableRow.appendChild(tdItemName);
        }
        newTable.appendChild(newTableRow);
    }

    var newTD = document.createElement("td");
    newTD.style.textAlign = "center";
    newTD.style.verticalAlign = "top";
    var criteriaTableName = document.createElement("h2");
    criteriaTableName.innerHTML = "CRITERIA";
    newTD.appendChild(criteriaTableName);
    newTD.appendChild(newTable);
    tableRowCriteria.appendChild(newTD);

    if (cnt > 0) {
        var pariWiseTables = document.getElementById("pairWiseTablesCriteria");
        var newRow = document.createElement("tr");
        newRow.id = "pairWiseRowButton";
        var calculateButton = document.createElement("button");
        calculateButton.classList.add("styled-button");
        calculateButton.innerHTML = "CALCULATE";
        calculateButton.onclick = function(){calculateAHP()};
        newRow.appendChild(calculateButton);
        pariWiseTables.appendChild(newRow);
    }
}

function calculateAHP() {
    var pairWiseRow = document.getElementById("step3row");
    while (pairWiseRow.firstChild) {
        pairWiseRow.removeChild(pairWiseRow.firstChild);
    }

    var pairWiseRow = document.getElementById("step3arow");
    while (pairWiseRow.firstChild) {
        pairWiseRow.removeChild(pairWiseRow.firstChild);
    }

    var pairWiseRow = document.getElementById("step4row");
    while (pairWiseRow.firstChild) {
        pairWiseRow.removeChild(pairWiseRow.firstChild);
    }

    var pairWiseRow = document.getElementById("step5row");
    while (pairWiseRow.firstChild) {
        pairWiseRow.removeChild(pairWiseRow.firstChild);
    }

    var pairWiseRow = document.getElementById("step6row");
    while (pairWiseRow.firstChild) {
        pairWiseRow.removeChild(pairWiseRow.firstChild);
    }

    var pairWiseRow = document.getElementById("step7row");
    while (pairWiseRow.firstChild) {
        pairWiseRow.removeChild(pairWiseRow.firstChild);
    }

    var exportButton = document.getElementById("exportBtn");
    if (exportButton) {
        exportButton.parentNode.removeChild(exportButton);
    }

    itemCriteriaAOA = [];
    step2AOA = [];
    step3AOA = [];
    step3aAOA = [];
    step4AOA = [];
    step5AOA = [];
    step6AOA = [];
    step7AOA = [];

    var items = [];
    var criteria = [];

    var itemTable = document.getElementById("itemTable");
    var rows = itemTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var firstCellContent = rows[i].getElementsByTagName("td")[0].innerText;
        items.push(firstCellContent);
    }

    var criteriaTable = document.getElementById("criteriaTable");
    var rows = criteriaTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var firstCellContent = rows[i].getElementsByTagName("td")[0].innerText;
        criteria.push(firstCellContent);
    }

    var itemsAOA = ['Items', ...items];
    var criteriaAOA = ['Criteria', ...criteria];
    itemCriteriaAOA.push(itemsAOA);
    itemCriteriaAOA.push(criteriaAOA);

    var step3row = document.getElementById("step3row");
    document.getElementById("step3h1").style.display = "block";

    var tdElements = document.querySelectorAll('#pairWiseRow > td');

    step2AOA.push(["VARIANTS"]);
    step2AOA.push([]);
      
    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');
        step2AOA.push([criteria[i]]);
        step3AOA.push([criteria[i]]);

        var newTR = document.createElement("tr");
        var newTRAOA = [];
        newTR.appendChild(document.createElement("th"));
        newTRAOA.push("");
        for (var j = 0; j < items.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = items[j];
            newTR.appendChild(newTH);

            newTRAOA.push(items[j]);
        }
        newTable.appendChild(newTR);
        step2AOA.push(newTRAOA);
        step3AOA.push(newTRAOA);

        columnSums = [];
        for (var j = 0; j < items.length; j++) {
            columnSums.push(0);
        }

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTRAOA = [];
            var newTRAOA2 = [];
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTableRow.appendChild(newTH);
            newTRAOA.push(items[j-1]);
            newTRAOA2.push(items[j-1]);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = tdTableElements[k].firstChild;
                if (currentElement.tagName.toLowerCase() === 'span') {
                    newTableData.innerHTML = parseNumber(currentElement.innerHTML);
                    columnSums[k-1] += parseNumber(currentElement.innerHTML);
                    newTRAOA.push(parseNumber(currentElement.innerHTML));
                    newTRAOA2.push(currentElement.innerHTML);
                }
                else if (currentElement.tagName.toLowerCase() === 'input') {
                    newTableData.innerHTML = parseNumber(currentElement.value);
                    columnSums[k-1] += parseNumber(currentElement.value);
                    newTRAOA.push(parseNumber(currentElement.value));
                    newTRAOA2.push(currentElement.value);
                }
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow)
            step2AOA.push(newTRAOA2);
            step3AOA.push(newTRAOA);
        }
        step2AOA.push([]);

        var newTRAOA = [];
        var rowColumnSums = document.createElement("tr");
        rowColumnSums.style.background = "lightgray";
        var tdSum = document.createElement("td");
        tdSum.style.textAlign = "right";
        tdSum.innerHTML = "<strong>SUM</strong>";
        rowColumnSums.appendChild(tdSum);
        newTRAOA.push("SUM");
        for (var j = 0; j < columnSums.length; j++) {
            var tdSum = document.createElement("td");
            tdSum.style.textAlign = "center";
            tdSum.innerHTML = columnSums[j];
            rowColumnSums.appendChild(tdSum);
            newTRAOA.push(columnSums[j]);
        }
        newTable.appendChild(rowColumnSums);
        step3AOA.push(newTRAOA);
        step3AOA.push([]);

        itemsColumnSumsDict[criteria[i]] = columnSums;

        var newTD = document.createElement("td");
        newTD.style.textAlign = "center";
        newTD.style.verticalAlign = "top";
        var criteriaTableName = document.createElement("h2");
        criteriaTableName.innerHTML = criteria[i];
        newTD.appendChild(criteriaTableName);
        newTD.appendChild(newTable);
        step3row.appendChild(newTD);
    }

    var step3arow = document.getElementById("step3arow");
    document.getElementById("step3ah1").style.display = "block";

    var tdElements = document.querySelectorAll('#step3row > td');

    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        step3aAOA.push([criteria[i]]);

        var newTR = document.createElement("tr");
        var newTRAOA = [];
        newTR.appendChild(document.createElement("th"));
        newTRAOA.push("");
        for (var j = 0; j < items.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = items[j];
            newTRAOA.push(items[j]);
            newTR.appendChild(newTH);
        }
        newTable.appendChild(newTR);
        step3aAOA.push(newTRAOA)

        for (var j = 1; j < trTableElements.length-1; j++) {
            var newTableRow = document.createElement("tr");
            var newTRAOA = [];
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTRAOA.push(items[j-1]);
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = parseNumber(tdTableElements[k].innerHTML);
                newTableData.innerHTML = currentElement / itemsColumnSumsDict[criteria[i]][k-1];
                newTRAOA.push(currentElement / itemsColumnSumsDict[criteria[i]][k-1]);
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow)
            step3aAOA.push(newTRAOA);
        }

        step3aAOA.push([]);

        var newTD = document.createElement("td");
        newTD.style.textAlign = "center";
        newTD.style.verticalAlign = "top";
        var criteriaTableName = document.createElement("h2");
        criteriaTableName.innerHTML = criteria[i];
        newTD.appendChild(criteriaTableName);
        newTD.appendChild(newTable);
        step3arow.appendChild(newTD);
    }

    var step4row = document.getElementById("step4row");
    document.getElementById("step4h1").style.display = "block";

    var tdElements = document.querySelectorAll('#step3arow > td');

    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');
        
        step4AOA.push([criteria[i]]);

        var newTR = document.createElement("tr");
        var newTRAOA = [];
        newTR.appendChild(document.createElement("th"));
        newTRAOA.push("");
        for (var j = 0; j < items.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = items[j];
            newTRAOA.push(items[j]);
            newTR.appendChild(newTH);
        }
        var newTH = document.createElement("th");
        newTH.style.background = "lightgray";
        newTH.innerHTML = "Priority vector";
        newTRAOA.push("Priority vector");
        newTR.appendChild(newTH);
        newTable.appendChild(newTR);

        step4AOA.push(newTRAOA);

        rowSums = [];
        for (var j = 0; j < items.length; j++) {
            rowSums.push(0);
        }

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            var newTRAOA = [];
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTRAOA.push(items[j-1]);
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = parseNumber(tdTableElements[k].innerHTML);
                rowSums[j-1] += currentElement;
                newTableData.innerHTML = currentElement;
                newTRAOA.push(currentElement);
                newTableRow.appendChild(newTableData);
            }
            var newTableData = document.createElement("td");
            newTableData.style.textAlign = "center";
            newTableData.style.background = "lightgray";
            newTableData.innerHTML = rowSums[j-1] / items.length;
            newTRAOA.push(rowSums[j-1] / items.length);
            newTableRow.appendChild(newTableData);
            newTable.appendChild(newTableRow)
            step4AOA.push(newTRAOA);
        }

        itemsRowSumsDict[criteria[i]] = rowSums;
        step4AOA.push([]);

        var newTD = document.createElement("td");
        newTD.style.textAlign = "center";
        newTD.style.verticalAlign = "top";
        var criteriaTableName = document.createElement("h2");
        criteriaTableName.innerHTML = criteria[i];
        newTD.appendChild(criteriaTableName);
        newTD.appendChild(newTable);
        step4row.appendChild(newTD);
    }

    var step5row = document.getElementById("step5row");
    document.getElementById("step5h1").style.display = "block";

    var tdElements = document.querySelectorAll('#step4row > td');

    var newTable = document.createElement("table");
    newTable.classList.add("styled-table");
    newTable.style.minWidth = "0px";

    var newTR = document.createElement("tr");
    var newTRAOA = [];
    newTR.appendChild(document.createElement("th"));
    newTRAOA.push("");
    for (var j = 0; j < criteria.length; j++) {
        var newTH = document.createElement("th");
        newTH.innerHTML = criteria[j];
        newTRAOA.push(criteria[j]);
        newTR.appendChild(newTH);
    }
    newTable.appendChild(newTR);
    step5AOA.push(newTRAOA);

    priorityVectorLists = [];
    for (var j = 0; j < items.length; j++) {
        priorityVectorLists.push([]);
    } 

    for (var i = 0; i < tdElements.length; i++) {;
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        for (var j = 1; j < trTableElements.length; j++) {
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = tdTableElements.length-1 ; k < tdTableElements.length; k++) {
                priorityVectorLists[j-1].push(parseNumber(tdTableElements[k].innerHTML));
            }
        }
    }

    for (var i = 0; i < items.length; i++) {
        var newTableRow = document.createElement("tr");
        var newTH = document.createElement("td");
        var newTRAOA = [];
        newTH.style.textAlign = "right";
        newTH.innerHTML = "<strong>" + items[i] + "</strong>"
        newTRAOA.push(items[i]);
        newTableRow.appendChild(newTH);
        for (var j = 0; j < priorityVectorLists[i].length; j++) {
            var newTableData = document.createElement("td");
            newTableData.style.textAlign = "center";
            newTableData.style.background = "lightgray";
            newTableData.innerHTML = priorityVectorLists[i][j];
            newTRAOA.push(priorityVectorLists[i][j]);
            newTableRow.appendChild(newTableData);
        }
        newTableRow.appendChild(newTableData);
        newTable.appendChild(newTableRow)
        step5AOA.push(newTRAOA);
    }

    var newTD = document.createElement("td");
    newTD.style.textAlign = "center";
    newTD.style.verticalAlign = "top";
    newTD.appendChild(newTable);
    step5row.appendChild(newTD);

    var step6row = document.getElementById("step6row");
    document.getElementById("step6h1").style.display = "block";

    var tdElements = document.querySelectorAll('#pairWiseRowCriteria > td');

    step2AOA.push(["CRITERIA"]);
    step2AOA.push([]);

    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        var newTRAOA = [];
        newTR.appendChild(document.createElement("th"));
        newTRAOA.push("");
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTRAOA.push(criteria[j]);
            newTR.appendChild(newTH);
        }
        newTable.appendChild(newTR);
        step6AOA.push(newTRAOA);
        step2AOA.push(newTRAOA);

        columnSums = [];
        for (var j = 0; j < criteria.length; j++) {
            columnSums.push(0);
        }

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTRAOA = [];
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + criteria[j-1] + "</strong>"
            newTRAOA.push(criteria[j-1]);
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = tdTableElements[k].firstChild;
                if (currentElement.tagName.toLowerCase() === 'span') {
                    newTableData.innerHTML = parseNumber(currentElement.innerHTML);
                    columnSums[k-1] += parseNumber(currentElement.innerHTML);
                    newTRAOA.push(currentElement.innerHTML);
                }
                else if (currentElement.tagName.toLowerCase() === 'input') {
                    newTableData.innerHTML = parseNumber(currentElement.value);
                    columnSums[k-1] += parseNumber(currentElement.value);
                    newTRAOA.push(currentElement.value);
                }
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow)
            step6AOA.push(newTRAOA);
            step2AOA.push(newTRAOA);
        }

        var rowColumnSums = document.createElement("tr");
        rowColumnSums.style.background = "lightgray";
        var newTRAOA = [];
        var tdSum = document.createElement("td");
        tdSum.style.textAlign = "right";
        tdSum.innerHTML = "<strong>SUM</strong>";
        newTRAOA.push("SUM");
        rowColumnSums.appendChild(tdSum);
        for (var j = 0; j < columnSums.length; j++) {
            var tdSum = document.createElement("td");
            tdSum.style.textAlign = "center";
            tdSum.innerHTML = columnSums[j];
            newTRAOA.push(columnSums[j]);
            rowColumnSums.appendChild(tdSum);
        }
        newTable.appendChild(rowColumnSums);
        step6AOA.push(newTRAOA);

        criteriaColumnSumsDict[criteria[i]] = columnSums;

        var newTD = document.createElement("td");
        newTD.style.textAlign = "center";
        newTD.style.verticalAlign = "top";
        newTD.appendChild(newTable);
        step6row.appendChild(newTD);
    }

    step6AOA.push([]);

    var newTD = document.createElement("td");
    newTD.innerHTML = "\u00A0\u00A0\u00A0";
    step6row.appendChild(newTD);

    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        var newTRAOA = [];
        newTR.appendChild(document.createElement("th"));
        newTRAOA.push("");
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTRAOA.push(criteria[j]);
            newTR.appendChild(newTH);
        }
        newTable.appendChild(newTR);
        step6AOA.push(newTRAOA);

        rowSums = [];
        for (var j = 0; j < criteria.length; j++) {
            rowSums.push(0);
        }

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            var newTRAOA = [];
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + criteria[j-1] + "</strong>"
            newTRAOA.push(criteria[j-1]);
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = tdTableElements[k].firstChild;
                if (currentElement.tagName.toLowerCase() === 'span') {
                    var newNumber = parseNumber(currentElement.innerHTML) / criteriaColumnSumsDict[criteria[i]][k-1];
                    newTableData.innerHTML = newNumber;
                    newTRAOA.push(newNumber);
                    rowSums[j-1] += newNumber;
                }
                else if (currentElement.tagName.toLowerCase() === 'input') {
                    var newNumber = parseNumber(currentElement.value) / criteriaColumnSumsDict[criteria[i]][k-1];
                    newTableData.innerHTML = newNumber;
                    newTRAOA.push(newNumber);
                    rowSums[j-1] += newNumber;
                }
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow);
            step6AOA.push(newTRAOA);
        }

        criteriaRowSumsDict[criteria[i]] = rowSums;

        var newTD = document.createElement("td");
        newTD.style.textAlign = "center";
        newTD.style.verticalAlign = "top";
        newTD.appendChild(newTable);
        step6row.appendChild(newTD);
    }

    var newTD = document.createElement("td");
    newTD.innerHTML = "\u00A0\u00A0\u00A0";
    step6row.appendChild(newTD);

    step6AOA.push([]);

    priorityVectorList = [];

    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        var newTRAOA = [];
        newTR.appendChild(document.createElement("th"));
        newTRAOA.push("");
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTRAOA.push(criteria[j]);
            newTR.appendChild(newTH);
        }
        var newTH = document.createElement("th");
        newTH.style.background = "lightgray";
        newTH.innerHTML = "Priority vector";
        newTRAOA.push("Priority vector");
        newTR.appendChild(newTH);
        newTable.appendChild(newTR);
        step6AOA.push(newTRAOA);

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            var newTRAOA = [];
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + criteria[j-1] + "</strong>"
            newTRAOA.push(criteria[j-1]);
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = tdTableElements[k].firstChild;
                if (currentElement.tagName.toLowerCase() === 'span') {
                    var newNumber = parseNumber(currentElement.innerHTML) / criteriaColumnSumsDict[criteria[i]][k-1];
                    newTableData.innerHTML = newNumber;
                    newTRAOA.push(newNumber);
                }
                else if (currentElement.tagName.toLowerCase() === 'input') {
                    var newNumber = parseNumber(currentElement.value) / criteriaColumnSumsDict[criteria[i]][k-1];
                    newTableData.innerHTML = newNumber;
                    newTRAOA.push(newNumber);
                }
                newTableRow.appendChild(newTableData);
            }
            var newTableData = document.createElement("td");
            newTableData.style.textAlign = "center";
            newTableData.style.background = "lightgray";
            newTableData.innerHTML = criteriaRowSumsDict[criteria[i]][j-1] / criteria.length;
            newTRAOA.push(criteriaRowSumsDict[criteria[i]][j-1] / criteria.length);
            priorityVectorList.push(criteriaRowSumsDict[criteria[i]][j-1] / criteria.length);
            newTable.appendChild(newTableRow)
            newTableRow.appendChild(newTableData);
            step6AOA.push(newTRAOA);
        }

        var newTD = document.createElement("td");
        newTD.style.textAlign = "center";
        newTD.style.verticalAlign = "top";
        newTD.appendChild(newTable);
        step6row.appendChild(newTD);
    }

    var step7row = document.getElementById("step7row");
    document.getElementById("step7h1").style.display = "block";

    var tdElements = document.querySelectorAll('#step5row > td');

    var newTable = document.createElement("table");
    newTable.classList.add("styled-table");
    newTable.style.minWidth = "0px";
    var newTR = document.createElement("tr");
    var newTD = document.createElement("td");
    var newTRAOA = [];
    newTD.style.textAlign = "right";
    newTD.innerHTML = "<strong>Criteria Priority Vector</strong>"
    newTRAOA.push("Criteria Priority Vector");
    newTR.appendChild(newTD);

    for (var i = 0; i < priorityVectorList.length; i++) {
        var newTH = document.createElement("td");
        newTH.style.textAlign = "center";
        newTH.innerHTML = priorityVectorList[i];
        newTRAOA.push(priorityVectorList[i]);
        newTR.appendChild(newTH);
    }
    newTable.appendChild(newTR);
    step7AOA.push(newTRAOA);

    for (var i = 0; i < tdElements.length; i++) {
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        var newTRAOA = [];
        newTR.appendChild(document.createElement("th"));
        newTRAOA.push("");
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTRAOA.push(criteria[j]);
            newTR.appendChild(newTH);
        }
        newTable.appendChild(newTR);
        step7AOA.push(newTRAOA);

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            var newTRAOA = [];
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTRAOA.push(items[j-1]);
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                newTableData.innerHTML = tdTableElements[k].innerHTML;
                newTRAOA.push(tdTableElements[k].innerHTML);
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow)
            step7AOA.push(newTRAOA);
        }
    }

    var newTD = document.createElement("td");
    newTD.style.verticalAlign = "top";
    newTD.appendChild(newTable);
    step7row.appendChild(newTD);

    var newTD = document.createElement("td");
    newTD.innerHTML = "\u00A0\u00A0\u00A0";
    step7row.appendChild(newTD);

    step7AOA.push([]);

    overallVectorValues = [];

    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.id = "finalTable";
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        var newTRAOA = [];
        newTR.appendChild(document.createElement("th"));
        newTRAOA.push("");
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTRAOA.push(criteria[j]);
            newTR.appendChild(newTH);
        }
        var newTH = document.createElement("th");
        newTH.innerHTML = "Overall Priority Vector";
        newTRAOA.push("Overall Priority Vector");
        newTRAOA.push("RANKING");
        newTR.appendChild(newTH);
        newTable.appendChild(newTR);
        step7AOA.push(newTRAOA);

        for (var j = 1; j < trTableElements.length; j++) {
            var rowSumOverallVector = 0;
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            var newTRAOA = [];
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTRAOA.push(items[j-1]);
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                newTableData.innerHTML = tdTableElements[k].innerHTML * priorityVectorList[k-1];
                newTRAOA.push(tdTableElements[k].innerHTML * priorityVectorList[k-1]);
                rowSumOverallVector += parseNumber(tdTableElements[k].innerHTML * priorityVectorList[k-1]);
                newTableRow.appendChild(newTableData);
            }
            var newTableData = document.createElement("td");
            newTableData.style.textAlign = "center";
            newTableData.innerHTML = rowSumOverallVector / criteria.length;
            newTRAOA.push(rowSumOverallVector / criteria.length);
            overallVectorValues.push(rowSumOverallVector / criteria.length);
            newTableRow.appendChild(newTableData);
            newTable.appendChild(newTableRow);
            step7AOA.push(newTRAOA);
        }

        var newTD = document.createElement("td");
        newTableData.style.textAlign = "center";
        newTD.style.verticalAlign = "top";
        newTD.appendChild(newTable);
        step7row.appendChild(newTD);

        ranks = getRanks(overallVectorValues);

        var finalTable = document.getElementById("finalTable");
        var trTableElements = finalTable.querySelectorAll('tr');
        for (var j = 0; j < trTableElements.length; j++) {
            if (j == 0) {
                var newTableData = document.createElement("th");
                newTableData.style.textAlign = "center";
                newTableData.style.background = "lightgray";
                newTableData.style.fontWeight = "900";
                newTableData.style.color = "red";
                newTableData.innerHTML = "RANKING";
                trTableElements[j].appendChild(newTableData);
            } else {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                newTableData.style.background = "lightgray";
                newTableData.style.fontWeight = "900";
                newTableData.style.color = "red";
                newTableData.innerHTML = ranks[j-1];
                trTableElements[j].appendChild(newTableData);
            }
        }

        var rankCounter = 0;
        for (var j = step7AOA.length-items.length; j < step7AOA.length; j++) {
            step7AOA[j].push(ranks[rankCounter]);
            rankCounter++;
        }
    }

    var exportButtonXLSX = document.createElement("button");
    exportButtonXLSX.id = "exportBtn";
    exportButtonXLSX.classList.add("styled-button");
    exportButtonXLSX.innerHTML = "EXPORT TO XLSX";
    exportButtonXLSX.onclick = function(){exportToXLSX("AHP_Export")};
    document.body.appendChild(exportButtonXLSX);
}

function parseNumber(input) {
    if (typeof input === 'string' && input.includes('/')) {
        const [numerator, denominator] = input.split('/').map(Number);

        if (denominator !== 0) {
            return numerator / denominator;
        } else {
            console.error('Error: Division by zero');
            return NaN;
        }
    } else {
        return parseFloat(input);
    }
}

function getRanks(nums) {
    let indices = Array.from(nums.keys());
    indices.sort((a, b) => nums[b] - nums[a]);
    let ranks = Array(nums.length);
    for (let i = 0; i < indices.length; i++) {
      ranks[indices[i]] = i + 1;
    }
  
    return ranks;
}

function exportToXLSX(filename) {
    var wb = XLSX.utils.book_new();
    
    var sheetName = "Items and Criteria";
    var ws = XLSX.utils.aoa_to_sheet(itemCriteriaAOA);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    var sheetName = "STEP 2";
    var ws = XLSX.utils.aoa_to_sheet(step2AOA);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    var sheetName = "STEP 3";
    var ws = XLSX.utils.aoa_to_sheet(step3AOA);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    var sheetName = "STEP 3a";
    var ws = XLSX.utils.aoa_to_sheet(step3aAOA);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    var sheetName = "STEP 4";
    var ws = XLSX.utils.aoa_to_sheet(step4AOA);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    var sheetName = "STEP 5";
    var ws = XLSX.utils.aoa_to_sheet(step5AOA);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    var sheetName = "STEP 6";
    var ws = XLSX.utils.aoa_to_sheet(step6AOA);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    var sheetName = "STEP 7";
    var ws = XLSX.utils.aoa_to_sheet(step7AOA);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
    XLSX.writeFile(wb, `${filename}.xlsx`);
}