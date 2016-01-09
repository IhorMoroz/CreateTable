(function(){
    var self, objTable, action;

    function Table(parentElement, objectTable) {
        self = this;

        this.maxlongLineObjectTable = function(obj){
            var count = 0, int = 0, num, result;
            for(var i = 0;i < obj.length;i++){
                count = 0;
                for (var res in obj[i]) {
                    if (obj[i].hasOwnProperty(res)) {
                        count++;
                        num = i;
                    }
                }
                if(int <= count) {
                    int = count;
                    result = num;
                }
            }
            return result;
        };

        this.createThead = function(obj){
            var thead = document.createElement('thead'),
                trhead = document.createElement('tr'),
                maxTitleCount = this.maxlongLineObjectTable(obj);

            for(var h in obj[maxTitleCount]){
                var td = document.createElement('td');
                td.innerHTML = h;
                td.setAttribute('data-sort', h);
                td.classList.add('title');
                trhead.appendChild(td);
            }
            thead.appendChild(trhead);
            return thead;
        };

        this.createTbody = function(obj){
            var tbody = document.createElement('tbody');
            for(var j = 0;j < obj.length;j++){
                var tr = document.createElement('tr');
                for(var val in obj[j]){
                    var tdbody = document.createElement('td');
                    tdbody.innerHTML =  obj[j][val];
                    tr.appendChild(tdbody);
                }
                tbody.appendChild(tr);
            }
            return tbody;
        };

        this.build = function(obj){
            var tbObj = obj || objectTable;
            /* ### THEAD ### */
            parentElement.appendChild(this.createThead(tbObj));
            /* ### AND THEAD ### */
            /* ### TBODY ### */
            parentElement.appendChild(this.createTbody(tbObj));
            /* ### AND TBODY ### */
        };

        this.removeChildenParentElement = function(){
            while(parentElement.firstChild){
                parentElement.removeChild(parentElement.firstChild);
            }
        };

        this.sorting = function(act2){
            self.removeChildenParentElement();
            objTable = objectTable.sort(function(a,b){
                return a[act2] > b[act2];
            });
            self.build(objTable);
        };

        parentElement.addEventListener('click', function(e){
            var target = e.target;
            action = target.getAttribute('data-sort');
            if(action) self.sorting(action);
        });
    }
    window.Table = Table;
})();
