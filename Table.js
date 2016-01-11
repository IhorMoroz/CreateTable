(function(){
    var self, objTable, action, textSearch, actPagin;

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

        this.arrayChunk = function(obj, size){
            if(typeof obj === 'object' && obj.length > 0){
                for(var x, i = 0, c = -1, l = obj.length, n = []; i < l; i++){
                    if(x = i % size){
                        n[c][x] = obj[i];
                    }else{
                        n[++c] = [obj[i]];
                    }
                }
                return n;
            }
        };

        this.buildPagination = function(){
            var pag = self.arrayChunk(objectTable, TABLE_PAGINATION_SHOW_ROWS),
                boxPagin = document.createElement('div');
            boxPagin.setAttribute('class', 'boxPagination');
            for(var i = 0; i < pag.length;i++){
                var a = document.createElement('a');
                a.setAttribute('class', 'paginationLink');
                a.setAttribute('data-pagination', i+1);
                a.setAttribute('href', '#');
                a.innerHTML = i+1;
                boxPagin.appendChild(a);
            }
            return boxPagin;
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
                    if(TABLE_SEARCH && textSearch == obj[j][val]) tdbody.setAttribute('class','search');
                    tr.appendChild(tdbody);
                }
                tbody.appendChild(tr);
            }
            return tbody;
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

        this.pagination = function(num){
            var page = num || 1;
            var res = self.arrayChunk(objectTable, TABLE_PAGINATION_SHOW_ROWS);
            return res[page-1];
        };

        this.buildSearch = function(){
            var boxSearch = document.createElement('div'),
                input = document.createElement('input'),
                butSr = document.createElement('button');
            boxSearch.classList.add('boxSearch');
            input.setAttribute('type','search');
            input.setAttribute('placeholder','Search...');
            input.setAttribute('class','lineSearch');
            butSr.setAttribute('type','button');
            butSr.innerHTML = "Searsh...";
            butSr.setAttribute('data-search','tableSearch');
            butSr.setAttribute('class','butSearch');
            boxSearch.appendChild(input);
            boxSearch.appendChild(butSr);
            return boxSearch;
        };

        this.selectSearchQuery = function(){
            var searchText = document.querySelector('.lineSearch').value;
            return searchText;
        };

        parentElement.addEventListener('click', function(e){
            var target = e.target;
            if(TABLE_SORTING && target.hasAttribute('data-sort')){
                action = target.getAttribute('data-sort');
                if(action) self.sorting(action);
            }
            if(TABLE_SEARCH && target.hasAttribute('data-search')){
                var actSear = target.getAttribute('data-search');
                textSearch = self.selectSearchQuery();
                if(actSear){
                    self.removeChildenParentElement();
                    self.build();
                }
            }
            if(TABLE_PAGINATION && target.hasAttribute('data-pagination')){
                actPagin = target.getAttribute('data-pagination');
                if(actPagin){
                    self.removeChildenParentElement();
                    self.build();
                }

            }
        });
        this.build = function(obj){
            var tbObj = obj || objectTable,
            table = document.createElement('table');
            table.appendChild(this.createThead(tbObj));
            if(TABLE_PAGINATION) table.appendChild(this.createTbody(this.pagination(actPagin)));
            else table.appendChild(this.createTbody(tbObj));
            if(TABLE_SEARCH) parentElement.appendChild(this.buildSearch());
            parentElement.appendChild(table);
            if(TABLE_PAGINATION) parentElement.appendChild(this.buildPagination());
        };
    }
    window.Table = Table;
})();
