var itemsColumnSumsDict = {};
var itemsRowSumsDict = {};
var criteriaColumnSumsDict = {};
var criteriaRowSumsDict = {};

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

    var step3row = document.getElementById("step3row");
    document.getElementById("step3h1").style.display = "block";

    var tdElements = document.querySelectorAll('#pairWiseRow > td');
      
    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        newTR.appendChild(document.createElement("th"));
        for (var j = 0; j < items.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = items[j];
            newTR.appendChild(newTH);
        }
        newTable.appendChild(newTR);

        columnSums = [];
        for (var j = 0; j < items.length; j++) {
            columnSums.push(0);
        }

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = tdTableElements[k].firstChild;
                if (currentElement.tagName.toLowerCase() === 'span') {
                    newTableData.innerHTML = parseNumber(currentElement.innerHTML);
                    columnSums[k-1] += parseNumber(currentElement.innerHTML);
                }
                else if (currentElement.tagName.toLowerCase() === 'input') {
                    newTableData.innerHTML = parseNumber(currentElement.value);
                    columnSums[k-1] += parseNumber(currentElement.value);
                }
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow)
        }

        var rowColumnSums = document.createElement("tr");
        rowColumnSums.style.background = "lightgray";
        var tdSum = document.createElement("td");
        tdSum.style.textAlign = "right";
        tdSum.innerHTML = "<strong>SUM</strong>";
        rowColumnSums.appendChild(tdSum);
        for (var j = 0; j < columnSums.length; j++) {
            var tdSum = document.createElement("td");
            tdSum.style.textAlign = "center";
            tdSum.innerHTML = columnSums[j];
            rowColumnSums.appendChild(tdSum);
        }
        newTable.appendChild(rowColumnSums);

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

        var newTR = document.createElement("tr");
        newTR.appendChild(document.createElement("th"));
        for (var j = 0; j < items.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = items[j];
            newTR.appendChild(newTH);
        }
        newTable.appendChild(newTR);

        for (var j = 1; j < trTableElements.length-1; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = parseNumber(tdTableElements[k].innerHTML);
                newTableData.innerHTML = currentElement / itemsColumnSumsDict[criteria[i]][k-1];
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow)
        }

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

        var newTR = document.createElement("tr");
        newTR.appendChild(document.createElement("th"));
        for (var j = 0; j < items.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = items[j];
            newTR.appendChild(newTH);
        }
        var newTH = document.createElement("th");
        newTH.style.background = "lightgray";
        newTH.innerHTML = "Priority vector";
        newTR.appendChild(newTH);
        newTable.appendChild(newTR);

        rowSums = [];
        for (var j = 0; j < items.length; j++) {
            rowSums.push(0);
        }

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = parseNumber(tdTableElements[k].innerHTML);
                rowSums[j-1] += currentElement;
                newTableData.innerHTML = currentElement;
                newTableRow.appendChild(newTableData);
            }
            var newTableData = document.createElement("td");
            newTableData.style.textAlign = "center";
            newTableData.style.background = "lightgray";
            newTableData.innerHTML = rowSums[j-1] / items.length;
            newTableRow.appendChild(newTableData);
            newTable.appendChild(newTableRow)
        }

        itemsRowSumsDict[criteria[i]] = rowSums;

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
    newTR.appendChild(document.createElement("th"));
    for (var j = 0; j < criteria.length; j++) {
        var newTH = document.createElement("th");
        newTH.innerHTML = criteria[j];
        newTR.appendChild(newTH);
    }
    newTable.appendChild(newTR);

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
        newTH.style.textAlign = "right";
        newTH.innerHTML = "<strong>" + items[i] + "</strong>"
        newTableRow.appendChild(newTH);
        for (var j = 0; j < priorityVectorLists[i].length; j++) {
            var newTableData = document.createElement("td");
            newTableData.style.textAlign = "center";
            newTableData.style.background = "lightgray";
            newTableData.innerHTML = priorityVectorLists[i][j];
            newTableRow.appendChild(newTableData);
        }
        newTableRow.appendChild(newTableData);
        newTable.appendChild(newTableRow)
    }

    var newTD = document.createElement("td");
    newTD.style.textAlign = "center";
    newTD.style.verticalAlign = "top";
    newTD.appendChild(newTable);
    step5row.appendChild(newTD);

    var step6row = document.getElementById("step6row");
    document.getElementById("step6h1").style.display = "block";

    var tdElements = document.querySelectorAll('#pairWiseRowCriteria > td');

    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        newTR.appendChild(document.createElement("th"));
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTR.appendChild(newTH);
        }
        newTable.appendChild(newTR);

        columnSums = [];
        for (var j = 0; j < criteria.length; j++) {
            columnSums.push(0);
        }

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + criteria[j-1] + "</strong>"
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = tdTableElements[k].firstChild;
                if (currentElement.tagName.toLowerCase() === 'span') {
                    newTableData.innerHTML = parseNumber(currentElement.innerHTML);
                    columnSums[k-1] += parseNumber(currentElement.innerHTML);
                }
                else if (currentElement.tagName.toLowerCase() === 'input') {
                    newTableData.innerHTML = parseNumber(currentElement.value);
                    columnSums[k-1] += parseNumber(currentElement.value);
                }
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow)
        }

        var rowColumnSums = document.createElement("tr");
        rowColumnSums.style.background = "lightgray";
        var tdSum = document.createElement("td");
        tdSum.style.textAlign = "right";
        tdSum.innerHTML = "<strong>SUM</strong>";
        rowColumnSums.appendChild(tdSum);
        for (var j = 0; j < columnSums.length; j++) {
            var tdSum = document.createElement("td");
            tdSum.style.textAlign = "center";
            tdSum.innerHTML = columnSums[j];
            rowColumnSums.appendChild(tdSum);
        }
        newTable.appendChild(rowColumnSums);

        criteriaColumnSumsDict[criteria[i]] = columnSums;

        var newTD = document.createElement("td");
        newTD.style.textAlign = "center";
        newTD.style.verticalAlign = "top";
        newTD.appendChild(newTable);
        step6row.appendChild(newTD);
    }

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
        newTR.appendChild(document.createElement("th"));
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTR.appendChild(newTH);
        }
        newTable.appendChild(newTR);

        rowSums = [];
        for (var j = 0; j < criteria.length; j++) {
            rowSums.push(0);
        }

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + criteria[j-1] + "</strong>"
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = tdTableElements[k].firstChild;
                if (currentElement.tagName.toLowerCase() === 'span') {
                    var newNumber = parseNumber(currentElement.innerHTML) / criteriaColumnSumsDict[criteria[i]][k-1];
                    newTableData.innerHTML = newNumber;
                    rowSums[j-1] += newNumber;
                }
                else if (currentElement.tagName.toLowerCase() === 'input') {
                    var newNumber = parseNumber(currentElement.value) / criteriaColumnSumsDict[criteria[i]][k-1];
                    newTableData.innerHTML = newNumber;
                    rowSums[j-1] += newNumber;
                }
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow)
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

    priorityVectorList = [];

    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        newTR.appendChild(document.createElement("th"));
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTR.appendChild(newTH);
        }
        var newTH = document.createElement("th");
        newTH.style.background = "lightgray";
        newTH.innerHTML = "Priority vector";
        newTR.appendChild(newTH);
        newTable.appendChild(newTR);

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + criteria[j-1] + "</strong>"
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                var currentElement = tdTableElements[k].firstChild;
                if (currentElement.tagName.toLowerCase() === 'span') {
                    var newNumber = parseNumber(currentElement.innerHTML) / criteriaColumnSumsDict[criteria[i]][k-1];
                    newTableData.innerHTML = newNumber;
                }
                else if (currentElement.tagName.toLowerCase() === 'input') {
                    var newNumber = parseNumber(currentElement.value) / criteriaColumnSumsDict[criteria[i]][k-1];
                    newTableData.innerHTML = newNumber;
                }
                newTableRow.appendChild(newTableData);
            }
            var newTableData = document.createElement("td");
            newTableData.style.textAlign = "center";
            newTableData.style.background = "lightgray";
            newTableData.innerHTML = criteriaRowSumsDict[criteria[i]][j-1] / criteria.length;
            priorityVectorList.push(criteriaRowSumsDict[criteria[i]][j-1] / criteria.length);
            newTable.appendChild(newTableRow)
            newTableRow.appendChild(newTableData);
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
    newTD.style.textAlign = "right";
    newTD.innerHTML = "<strong>Criteria Priority Vector</strong>"
    newTR.appendChild(newTD);

    for (var i = 0; i < priorityVectorList.length; i++) {
        var newTH = document.createElement("td");
        newTH.style.textAlign = "center";
        newTH.innerHTML = priorityVectorList[i];
        newTR.appendChild(newTH);
    }
    newTable.appendChild(newTR);

    for (var i = 0; i < tdElements.length; i++) {
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        newTR.appendChild(document.createElement("th"));
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTR.appendChild(newTH);
        }
        newTable.appendChild(newTR);

        for (var j = 1; j < trTableElements.length; j++) {
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                newTableData.innerHTML = tdTableElements[k].innerHTML;
                newTableRow.appendChild(newTableData);
            }
            newTable.appendChild(newTableRow)
        }
    }

    var newTD = document.createElement("td");
    newTD.style.verticalAlign = "top";
    newTD.appendChild(newTable);
    step7row.appendChild(newTD);

    var newTD = document.createElement("td");
    newTD.innerHTML = "\u00A0\u00A0\u00A0";
    step7row.appendChild(newTD);

    overallVectorValues = [];

    for (var i = 0; i < tdElements.length; i++) {
        var newTable = document.createElement("table");
        newTable.id = "finalTable";
        newTable.classList.add("styled-table");
        newTable.style.minWidth = "0px";
        var table = tdElements[i].querySelector('table');
        var trTableElements = table.querySelectorAll('tr');

        var newTR = document.createElement("tr");
        newTR.appendChild(document.createElement("th"));
        for (var j = 0; j < criteria.length; j++) {
            var newTH = document.createElement("th");
            newTH.innerHTML = criteria[j];
            newTR.appendChild(newTH);
        }
        var newTH = document.createElement("th");
        newTH.innerHTML = "Overall Priority Vector";
        newTR.appendChild(newTH);
        newTable.appendChild(newTR);

        for (var j = 1; j < trTableElements.length; j++) {
            var rowSumOverallVector = 0;
            var newTableRow = document.createElement("tr");
            var newTH = document.createElement("td");
            newTH.style.textAlign = "right";
            newTH.innerHTML = "<strong>" + items[j-1] + "</strong>"
            newTableRow.appendChild(newTH);
            var tdTableElements = trTableElements[j].querySelectorAll('td');
            for (var k = 1 ; k < tdTableElements.length; k++) {
                var newTableData = document.createElement("td");
                newTableData.style.textAlign = "center";
                newTableData.innerHTML = tdTableElements[k].innerHTML * priorityVectorList[k-1];
                rowSumOverallVector += parseNumber(tdTableElements[k].innerHTML * priorityVectorList[k-1]);
                newTableRow.appendChild(newTableData);
            }
            var newTableData = document.createElement("td");
            newTableData.style.textAlign = "center";
            newTableData.innerHTML = rowSumOverallVector / criteria.length;
            overallVectorValues.push(rowSumOverallVector / criteria.length);
            newTableRow.appendChild(newTableData);
            newTable.appendChild(newTableRow)
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
    }

    var exportButtonXLSX = document.createElement("button");
    exportButtonXLSX.classList.add("styled-button");
    exportButtonXLSX.innerHTML = "EXPORT TO XLSX";
    exportButtonXLSX.onclick = function(){exportToXLSX("finalTable", "table1_export_xlsx")};
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

function exportToXLSX(tableId, filename) {
    var wb = XLSX.utils.table_to_book(document.getElementById(tableId));
    XLSX.writeFile(wb, `${filename}.xlsx`);
}