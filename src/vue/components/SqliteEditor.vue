<template>
    <div class="SqliteEditor__status">
        <samp class="{{ (state) ? 'bg-'+state : '--fade' }}">{{ status }}</samp>
    </div>
    <ol class="breadcrumb" id="apiPath">/</ol>
    <div id="view"></div>
</template>

<script>
    export default {
        data() {
            return {
                status: '',
                state: '',
                editMode: '',
                apiDomain: 'http://StorageAPI.dev',
                apiPath: '/',
                apiMethod: 'GET'
            }
        },
        methods: {
            updateState(state) {
                this.state = state;

                if (this.fade)
                    clearTimeout(this.fade);

                this.fade = setTimeout( (function(){
                    this.state='';
                }).bind(this), 2000 );
            },
            updateNav() {
                var content = "";
                var h = '', hierarchy = this.apiPath.split('/');

                for (var i=0 ; i<hierarchy.length ; i++){
                    if (i!=0)
                        h += '/' + hierarchy[i];

                    var n = (hierarchy[i]!='') ? hierarchy[i] : 'Root';

                    if (i==hierarchy.length-1 || this.apiPath=='/'){
                        content += "<li class='active'>"+n+"</li>";
                        break;
                    }
                    else if (i==0)
                        content += "<li class='apiPath'><a href='"+this.$root.nav+"' data-path='/'>"+n+"</a></li>";
                    else
                        content += "<li class='apiPath'><a href='"+this.$root.nav+"' data-path='"+h+"'>"+n+"</a></li>";
                }
                
                content += "<li class='pull-right'><a href='"+this.$root.nav+"' data-path='"+this.apiPath+"'>reload</a></li>";
                
                $('#apiPath').html(content);

                var self = this;

                $('#apiPath a').click(function(){
                    self.navigate(this.getAttribute('data-path'))
                });
            },
            navigate(path, method, mode) {
                if (!path)
                    return;

                this.apiPath = path;

                this.apiMethod = (method) ? method : 'GET';

                this.editMode = (mode) ? mode : '';

                var data = false;
                if (this.apiMethod == 'PUT'){
                    data = {};
                    $('input').each(function(){
                        data[ this.getAttribute('name') ] = this.value;
                    })
                    console.log(data)
                }

                this.ajax(data);

                this.updateNav();
            },
            prepDB(data){
                var content = "<table class='table'>";

                content += "<tr><th>Table</th><th>Columns</th><th>Tools</th></tr>";

                for (var tableName in data) {
                    content += "<tr>";
                    content += " <td><a href='"+this.$root.nav+"' data-path='/"+tableName+"' data-list='table'>"+tableName+"</a></td>";
                    content += " <td>";
                    for (var i=0 ; i<data[tableName].length ; i++)
                        content += data[tableName][i]+" ";
                    content += " </td>";
                    content += " <td><a href='"+this.$root.nav+"' data-path='/"+tableName+"/info' data-mode='edit'>Edit</a></td>";
                    content += "</tr>";
                }

                content += "</table>";

                return content;
            },
            prepTable(data){
                var content = "";

                if (this.editMode) {
                    content += "<table class='table'>";

                    content += "<tr>";
                    content += " <td>Tablename:</td>";
                    content += " <td><input class='form-control' name="+tablename+" value='"+data.tablename+"'></td>";
                    content += "</tr>";

                    for (var column in data.columns){
                        content += "<tr>";
                        content += " <td>"+column+":</td>";
                        content += " <td><input class='form-control' name="+column+" value='"+data.columns[column]+"'></td>";
                        content += "</tr>";
                    }
                    
                    content += "<tr>";
                    content += " <td>Tools:</td>";
                    content += " <td>";
                    content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+"'>Cancel</a>";
                    content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+"' data-method='PUT'>Save</a>";
                    content += " </td>";
                    content += "</tr>";
                    
                    content += "</table>";
                }
                else {
                    content += "<table class='table'>";

                    content += "<tr>";
                    for (var key in data[0])
                        content += " <th>"+key+"</th>";
                    content += " <th>Tools</th>";
                    content += "</tr>";

                    for (var i=0; i<data.length ; i++){
                        content += "<tr>";
                        for (var key in data[i]){
                            if (key=="id" && this.apiPath.lastIndexOf('/'+data[i].id) <1 )
                                content += " <td><a href='"+this.$root.nav+"' data-path='"+this.apiPath+'/'+data[i].id+"'>"+data[i].id+"</a></td>";
                            else
                                content += " <td>"+data[i][key]+"</td>";
                        }
                        content += " <td>";
                        content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+'/'+data[i].id+"' data-method='DELETE'>KILL</a>";
                        content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+'/'+data[i].id+"' data-mode='edit'>Edit</a>";
                        content += " </td>";
                        content += "</tr>";
                    }

                    content += "</table>";
                }
                return content;
            },
            prepPost(data){
                var content = "";

                if (this.editMode) {
                    content += "<table class='table'>";

                    for (var key in data[0]){
                        content += "<tr>";
                        content += " <td>"+key+"</td>";
                        content += " <td><input class='form-control' name="+key+" value='"+data[0][key]+"'></td>";
                        content += "</tr>";
                    }
                    
                    content += "<tr>";
                    content += " <td>Tools:</td>";
                    content += " <td>";
                    content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+"'>Cancel</a>";
                    content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+"' data-method='PUT'>Save</a>";
                    content += " </td>";
                    content += "</tr>";
                    
                    content += "</table>";
                }
                else {
                    content += "<table class='table'>";

                    for (var key in data[0]){
                        content += "<tr>";
                        content += " <td>"+key+"</td>";
                        content += " <td>"+data[0][key]+"</td>";
                        content += "</tr>";
                    }
                    
                    content += "<tr>";
                    content += " <td>Tools:</td>";
                    content += " <td>";
                    content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+"' data-method='DELETE'>KILL</a>";
                    content += "  <a href='"+this.$root.nav+"' data-path='"+this.apiPath+"' data-mode='edit'>Edit</a>";
                    content += " </td>";
                    content += "</tr>";
                    
                    content += "</table>";
                }
                return content;
            },
            handleResponse(data,method){
                var self = this;
                var hierarchy = this.apiPath.split('/');

                var content = 
                    (this.apiPath == '/') ? this.prepDB(data) :
                    (hierarchy.length == 2) ? this.prepTable(data) :
                    (hierarchy.length  > 2) ? this.prepPost(data) : false;

                if (!content)
                    return;

                $('#view').html(content);

                $('#view a').click(function(){
                    self.navigate(
                        this.getAttribute('data-path'),
                        this.getAttribute('data-method'),
                        this.getAttribute('data-mode')
                    );
                });
            },
            ajax(data){
                var self = this;
                
                // Make a request
                self.status = "Connecting to storage @ '"+self.apiDomain+"' ...";

                $.ajax({
                    url: self.apiDomain+self.apiPath,
                    async: true,
                    data: data,
                    type: self.apiMethod,
                    success: function(response,status,xhr){
                        self.updateState('success');

                        self.status  = "Got response from '"+self.apiDomain+"'. "+xhr.status+" "+xhr.statusText;
                        self.handleResponse(response);
                    },
                    error: function(response,status,code){
                        self.updateState('danger');

                        self.status  = "Error from '"+self.apiDomain+"'. "+code;
                    }
                });
            }
        },
        ready(){
            this.navigate(this.apiPath);
        }
    }
</script>
